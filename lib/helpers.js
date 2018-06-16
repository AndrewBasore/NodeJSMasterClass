/* 
 * Helpers for various tasks
 * 
*/

// Dependencies
const crypto = require('crypto');
const config = require('./config.js');
const querystring = require('querystring');
const https = require('https');

// Container for all the helpers
const helpers = {};

// Create a SHA256 hash
helpers.hash = (string) => {
    if(typeof(string) == 'string' && string.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(string).digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = (string) => {
    try{
        const obj = JSON.parse(string);

        return obj;
    }catch(err) {
        return {};
    }
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = (strLength) =>{
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength){
        // Define all the possible characters that could go into a string
        const possibleCharacters = 'bacdefghijklmnopqrstuvwxyz0123456789';

        // Start the final string;
        let str = '';
        for(i = 1; i <= strLength ; i++){
            //Get a random character from the possible characters
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
            //Append this character to the final string
            str += randomCharacter;
        }

        // Return the final string
        return str;
    } else {
        return false;
    }
}

// Send an SMS message via Twilio
helpers.sendTwilioSms = (phone, msg, callback) =>{
    // Validate the parameters
    phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim(): false;
    msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <=1600 ? msg.trim() : false;
    if(phone && msg){
        // Configure the request payload to send to Twilio
        let payload = {
            'From' : config.twilio.fromPhone,
            'To' : '+1' + phone,
            'Body' : msg
        };

        // Stringify the payload
        const stringPayload = querystring.stringify(payload);

        // Configure the request details
        const requestDetails = {
            'protocol' : 'https:',
            'hostname' : 'api.twilio.com',
            'method' : 'POST',
            'path' : '/2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json',
            'auth' : config.twilio.accountSid + ':' + config.twilio.authToken,
            'headers' : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Length' : Buffer.byteLength(stringPayload)
            }
        };
        
        // Instantiate the request object
        let req = https.request(requestDetails, (res) =>{
            // Grab the status of the sent request
            let { statusCode } = res;
            // Callback successfully if the request went through
            if(statusCode == 200 || statusCode == 201){
                callback(false);
            } else {
                callback('Status code returned was ' + statusCode);
            }
        });

        // Bind to the error event so it doesnt get thrown
        req.on('error', (err) =>{
            callback(err);
        });

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();

    } else {
        callback('Given parameters were missing or invalid');
    }
}

//Export the container
module.exports = helpers;