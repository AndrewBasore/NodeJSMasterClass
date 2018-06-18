/*
 * Worker-related tasks
 */

// Dependencies
const path = require('path');
const fs = require('fs');
const _data = require('./data');
const https = require('https');
const http = require('http');
const helpers = require('./helpers');
const url = require('url');
const _logs = require('./logs');
const util = require('util');
const debug = util.debuglog('workers');


// Instantiate the worker object
const workers = {};

// Lookup all checks, get their data, send to a validator
workers.gatherAllChecks = () =>{
    // Get all the checks 
    _data.list('checks', (err, checks) =>{
        if(!err && checks && checks.length > 0){
            checks.forEach( (check) =>{
                //Split on extension and read only filename
                check = check.split('.')[0];
                // Read in the check data
                _data.read('checks', check, (err, originalCheckData) =>{
                    if(!err && originalCheckData){
                        // Pass it to the check validator, and let that function continue or log errors as needed
                        workers.validateCheckData(originalCheckData);
                    }else {
                        debug.log("Error: reading one of the checks data");
                    }
                });
            });
        } else{
           
            debug("Error : Could not find any checks to process :-(");
        }
    });
};

// Sanity-checking the check-data
workers.validateCheckData = (originalCheckData) =>{
    let {id, userPhone, protocol, url, method, successCodes, timeoutSeconds, state} = originalCheckData;

    originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData !== null ? originalCheckData: {};
    id = typeof(id) == 'string' && id.trim().length == 20 ? id: false;
    userPhone = typeof(userPhone) == 'string' && userPhone.trim().length == 10 ? userPhone: false;
    protocol = typeof(protocol) == 'string' && ['http', 'https'].indexOf(protocol) > -1 ? protocol: false;
    url = typeof(url) == 'string' && url.trim().length > 0 ? url: false;
    method = typeof(method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(method) > -1 ? method: false; 
    successCodes = typeof(successCodes) == 'object' && successCodes instanceof Array && successCodes.length > 0 ? successCodes : false;
    timeoutSeconds = typeof(timeoutSeconds) == 'number' && timeoutSeconds % 1 === 0 && timeoutSeconds >= 1 && timeoutSeconds <= 5 ? timeoutSeconds : false;
    
    // Set the keys that may not be set (if the workers have never seen this check before)
    state = typeof(state) == 'string' && ['up', 'down'].indexOf(state) > -1 ? state: 'down';
    lastChecked = typeof(lastChecked) == 'number' && lastChecked > 0 ? lastChecked : false;

    // If all the checks pass, pass the data along to the next step in the process
    if(id && 
    userPhone &&
    protocol &&
    url &&
    method &&
    successCodes &&
    timeoutSeconds
    ){
        workers.performCheck(originalCheckData);
    }else {
        debug("Error: One of the checks is not properly formatted. Skipping it", id, userPhone, protocol, url, method, successCodes, timeoutSeconds);
    }
};

// Perform the check, send the originalCheckData and the outcome of the check process, to the next step in the process
workers.performCheck = (originalCheckData) => {
    // Prepare the initial check outcome
    const checkOutcome = {
        'error': false,
        'responseCode' : false
    };

    // Mark that the outcome has not been set yet
    let outcomeSent = false;

    // Parse the hostname and the path out of the original check data
    let parsedUrl = url.parse(originalCheckData.protocol + '://' + originalCheckData.url, true);
    let hostName = parsedUrl.hostname;
    let path = parsedUrl.path; // Using path and not "pathname" because we want the query string

    // Constructing the request
    let requestDetails = {
        'protocol' : originalCheckData.protocol+ ':',
        'hostname' : hostName,
        'method' : originalCheckData.method.toUpperCase(),
        'path' : path,
        'timeout' : originalCheckData.timeoutSeconds * 1000
    };

    // Instantiate the request object (using either the http or https module)
    const _moduleToUse = originalCheckData.protocol == 'http' ? http: https;
    const req = _moduleToUse.request(requestDetails, (res) =>{
        // Grab the status of the sent request
        const status = res.statusCode;


        // Update the checkoutcome and pass the datta along
        checkOutcome.responseCode = status;
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    // Bind to the error event so ti doesn't get thrown
    req.on('error', (e) =>{
        // Update the checkoutcome and pass the datta along
        checkOutcome.error = {
            'error' : true,
            'value' : e
        };
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    // Bind to the timeout event
    req.on('timeout', (e) =>{
        // Update the checkoutcome and pass the datta along
        checkOutcome.error = {
            'error' : true,
            'value' : 'timeout'
        };
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    // End the request
    req.end();
    
}

// Process the check outcome, update the check data as needed, trigger an alert if needed
// Special logic for accomodating a check that has never been tested before (don't alert on this event)
workers.processCheckOutcome = (originalCheckData, checkOutcome) =>{
    // Variable deconstructed
    const { successCodes, lastChecked, state} = originalCheckData;
    const { error, responseCode } = checkOutcome;

    // Decide if the check is considered up or down
    const newState = !error && responseCode && successCodes.indexOf(responseCode) > -1 ? 'up' : 'down';

    // Decide if an alert is warranted
    const alertWarranted = lastChecked && state !== newState ? true: false;

    // Log the outcome
    const timeOfCheck = Date.now();
    workers.log(originalCheckData,checkOutcome, state, alertWarranted, timeOfCheck);


    // Update the check data
    let newCheckData = originalCheckData;
    newCheckData.state = newState;
    newCheckData.lastChecked = timeOfCheck;


    // Save the updates to disk
    _data.update('checks', newCheckData.id, newCheckData, (err) =>{
        if(!err){
            // Send the new check data to the next phase in the process if needed
            if(alertWarranted){
                workers.alertUserToStatusChange(newCheckData);
            } else {
                debug("Check outcome has not changed, no alert needed");
            }
        }else {
            debug("Error trying to save updates to one of the checks");
        }
    });
};

// Alert the user as to a change in their check status
workers.alertUserToStatusChange =  (newCheckData)=>{
    //Deconstruct variables from newCheckData
    let {userPhone, method, protocol, url, state} = newCheckData;

    //Create msg alert
    let msg = 'Alert: your check for ' + method.toUpperCase()+ ' ' + protocol+'://' + url + ' is currently ' +state; 
    
    //Send the SMS
    helpers.sendTwilioSms(userPhone, msg, (err) =>{
        if(!err){
            debug("Success: User was alerted to a status change in their check, via sms: ", msg);
        }else {
            debug("Error: could not send sms alert to use who had a state change in their check", err);
        }
    });
};

workers.log = (originalCheckData,checkOutcome, state, alertWarranted, timeOfCheck)=>{
    // Form the log data
    const logData = {
        'check' : originalCheckData,
        'outcome': checkOutcome,
        'state': state,
        'alert' : alertWarranted,
        'time' : timeOfCheck
    };

    // Convert data to a string
    const logString = JSON.stringify(logData);

    // Determine the name of the log file
    let logFileName = originalCheckData.id;

    // Append the log string to the file
    _logs.append(logFileName, logString, (err) =>{
        if(!err){
            console.log("Logging to file succeeded");
        }else{
            console.log("Logging to file failed");
        }
    })
}

// Timer to execute the worker-process once per minute
workers.loop = () =>{
    setInterval(() =>{
        workers.gatherAllChecks();
    }, 1000 * 60)
};

// Rotate (compress) the log files
workers.rotateLogs = () =>{
    // List all the (non compressed) logfiles
    _logs.list(false, (err, logs) =>{
        if(!err && logs && logs.length > 0){
            logs.forEach( (logName) =>{
                // Compress the data to a different file
                const logId = logName.replace('.log', '');
                const newFileId = logId +'-'+Date.now();
                _logs.compress(logId, newFileId, (err) =>{
                    if(!err){
                        // Truncate the log
                        _logs.truncate(logId, (err) =>{
                            if(!err){
                                debug("Success truncating log file");
                            } else{
                                debug("Error truncating log file");
                            }
                        });
                    }else {
                        debug("Error compressing one of the log files", err);
                    }
                })
            });
        }else{
            debug("Error: could not find any logs to rotate");
        }
    });
}

// Timer to execute the log-rotation service once per day
workers.logRotationLoop = () =>{
    setInterval(() =>{
        workers.rotateLogs();
    }, 1000 * 60 * 60 * 24)
}



// Init script
workers.init = () =>{

    // Send to console, in yellow
    console.log('\x1b[33m%s\x1b[0m', 'Background workers are running');

    // Execute all the checks immediately
    workers.gatherAllChecks();

    // Call the loop so the checks will execute on their own
    workers.loop();

    // Compress all the logs immediately
    workers.rotateLogs();

    // Call the compression loop so logs will be compressed later on
    workers.logRotationLoop();
}


// Export the module
module.exports = workers;