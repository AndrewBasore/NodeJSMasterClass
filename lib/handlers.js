/*
 *Request handlers
 *  
*/

//Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');

// Define the handlers 
const handlers = {};
/* 
 *
 * HTML Handlers
 * 
*/

// Index handler
handlers.index = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Uptime Monitoring -- Made Simple',
            'head.description' : 'We offer free, simple monitoring for HTTP/HTTPS sites of all kinds. When your site goes down, you will get a text to let you know!',
            'body.class' : 'index'
        };

        // Read in a template as a string
        helpers.getTemplate('index', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}

// Create account 
handlers.accountCreate = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Create an Account',
            'head.description' : 'Signup is easy and only takes a few seconds!',
            'body.class' : 'accountCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('accountCreate', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}

// Create new Session
handlers.sessionCreate = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Login to your Account',
            'head.description' : 'Please enter your phone number and password to access your accoun.',
            'body.class' : 'sessionCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('sessionCreate', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}

// Session has been deleted
handlers.sessionDeleted = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Logged Out',
            'head.description' : 'You have been logged out of your account.',
            'body.class' : 'sessionDeleted'
        };

        // Read in a template as a string
        helpers.getTemplate('sessionDeleted', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}


// Edit your account
handlers.accountEdit = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Account Settings',
            'body.class' : 'accountEdit'
        };

        // Read in a template as a string
        helpers.getTemplate('accountEdit', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}

// Account has been deleted
handlers.accountDeleted = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Account Deleted',
            'head.description' : 'Your account has been deleted.',
            'body.class' : 'accountDeleted'
        };

        // Read in a template as a string
        helpers.getTemplate('accountDeleted', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}

// Create a new check
handlers.checksCreate = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Create a new Check',
            'body.class' : 'checksCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('checksCreate', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}

// Dashboard ( View all checks ) 
handlers.checksList = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Dashboard',
            'body.class' : 'checksList'
        };

        // Read in a template as a string
        helpers.getTemplate('checksList', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}


// Edit a check
handlers.checksEdit = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){

        // Prepare data for interpolation
        const templateData = {
            'head.title' : 'Check Details',
            'body.class' : 'checksEdit'
        };

        // Read in a template as a string
        helpers.getTemplate('checksEdit', templateData, (err, str) =>{
            if(!err && str){
                // Add the univeersal header and footer
                helpers.addUniversalTemplates(str, templateData, (err,str) =>{
                    if(!err && str){
                        // Return that page as HTML
                        callback(200, str, 'html');
                    }else {
                        callback(500, undefined, 'html');
                    }
                });
            }else{
                callback(500, undefined, 'html');
            }
        })
    }else {
        callback(405, undefined, 'html');
    }
}

// Favicon
handlers.favicon = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico', (err, data) =>{
            if(!err && data){
                // Callback the data
                callback(200, data, 'favicon');
            } else{
                callback(500);
            }
        })
    } else{
        callback(405);
    }
}

// Public Assets
handlers.public = (data, callback) =>{
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Get the filename being requested
        const trimmedAssetName = data.trimmedPath.replace('public/','').trim();
        if(trimmedAssetName.length > 0){
            // read in the asset's data
            helpers.getStaticAsset(trimmedAssetName,(err, data) =>{
                if(!err && data){
                    // Determine the content type (Default to plain text)
                    let contentType = 'plain';
                    if(trimmedAssetName.indexOf('.css') > -1){
                        contentType = 'css';
                    }
                    if(trimmedAssetName.indexOf('.png') > -1){
                        contentType = 'png';
                    }
                    if(trimmedAssetName.indexOf('.jpg') > -1){
                        contentType = 'jpg';
                    }
                    if(trimmedAssetName.indexOf('.ico') > -1){
                        contentType = 'favicon';
                    }
                    
                    // Callback the data
                    callback(200, data, contentType);
                } else{
                    callback(404);
                }
            })
        } else{
            callback(404);
        }
    } else {

    }
}



/*
 * JSON API HANDLERS
 *  
*/


// Ping handler
handlers.ping = (data, callback) => {
    callback(200);
};

// Not found handlers
handlers.notFound = (data, callback) => {
    callback(404);
};


// Users
handlers.users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data, callback);
    }else{
        callback(405); //Error code for method not allowed
    }
}


//Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, ,tosAgreement
// Optional data: none
handlers._users.post = (data, callback) =>{
    // Check that all required fields are present
    let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    let lastName  = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    let tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement ? data.payload.tosAgreement : false;

    if(firstName && lastName && phone && password && tosAgreement) {
        // Make sure that the user doesnt already exist
        _data.read('users', phone, (err, data) =>{
            if(err) { //If error exist, then user does not exist, so we can create it
                //Hash the password
                const hashedPassword = helpers.hash(password);
                if(hashedPassword){
                    //Create the user object
                    const userObject = {
                        'firstName' : firstName,
                        'lastName' : lastName,
                        'phone' : phone,
                        'hashedPassword' : hashedPassword,
                        'tosAgreement': true
                    }

                    //Store the user
                    _data.create('users',phone, userObject, (err) => {
                        if(!err){
                            callback(200);
                        }else {
                            callback(500, {'Error' : 'Could not create the new user'})
                        }
                    })
                } else {
                    callback(500, {'Error' : 'Could not has the user\'s password'})
                }
                
            } else { // User already exists
                callback(400, {'Error': 'A User with that phone number already exists'});
            }
        });
    } else {
        callback(400, {'Error' : 'Missing required fields'});
    }
};

// Users - get
// Required data: phone
// Optional data: none
handlers._users.get = (data, callback) =>{
    // Check that the phone number is valid
    let phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.length == 10 ? data.queryStringObject.phone : false;
    if(phone){

        //Get the token from the headers
        const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        // Verify that the given token is valid for the phone number
        handlers._tokens.verifyToken(token, phone, (tokenIsValid) =>{
            if(tokenIsValid){
                //Lookup the user
                _data.read('users', phone, (err, data) => {
                    if(!err && data){
                        // Remove the hashed password from the user object before returning it to the requester
                        delete data.hashedPassword;
                        callback(200, data);
                    }else {
                        callback(404);
                    }
                })
            }else {
                callback(403, {'Error': 'Missing required token in header, or token is invalid'})
            }
        });


    }else {
        callback(400, {'Error' : 'Missing required field'})
    }
};

// Users - put
// Required data : phone
// Optional Data: firstName, lastName, password (at least one must be specified)
// @TODO Only let an euthenticated user updated their own object. Don't let them update anyone elses
handlers._users.put = (data, callback) =>{
    // Check for the required field
    let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.length == 10 ? data.payload.phone : false;

    // Check for the optional fields
    let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    let lastName  = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    
    if(phone){
        // Error if nothing is sent to update
        if(firstName || lastName || password){

            //Get the token from the headers
            const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

            handlers._tokens.verifyToken(token, phone, (tokenIsValid) =>{
                if(tokenIsValid){
                     //Lookup the user
                    _data.read('users', phone, (err, userData) =>{
                        if(!err && userData){
                            //Update the necessary fields
                            if(firstName){
                                userData.firstName = firstName;
                            }
                            if(lastName){
                                userData.lastName = lastName;
                            }
                            if(password){
                                userData.hashedPassword = helpers.hash(password);
                            }

                            //Store the new updates
                            _data.update('users', phone, userData, (err) =>{
                                if(!err){
                                    callback(200);
                                }else {
                                    callback(500, {'Error': 'Could not update the user'})
                                }
                            });
                        }else {
                            callback(400, {'Error': 'The specified user does not exist'})
                        }
                    })
                }else{
                    callback(403, {'Error': 'Missing required token in header, or token is invalid'})
                }
            });
           
        } else {
            callback(400, {'Error': 'Missing fields to update'})
        }
    }else {
        callback(400, {'Error' : "Missing required field"})
    }
};

// Users - delete
// Required field: Phone
handlers._users.delete = (data, callback) =>{
    // Check that the phone number is valid
    let phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.length == 10 ? data.queryStringObject.phone : false;
    if(phone){

        //Get the token from the headers
        const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        handlers._tokens.verifyToken(token, phone, (tokenIsValid) =>{
            if(tokenIsValid){
                //Lookup the user
                _data.read('users', phone, (err, userData) => {
                    if(!err && userData){
                        _data.delete('users', phone, (err) =>{
                            if(!err){
                                // Delete each of the checks associated with the user
                                const userChecks = typeof(userData.checks) == "object" && userData.checks instanceof Array  ? userData.checks: [];
                                const checksToDelete = userChecks.length;
                                if(checksToDelete > 0){
                                    let checksDeleted = 0;
                                    let deletionErrors = false;

                                    //Loop through checks
                                    userChecks.forEach( (checkId) =>{
                                        // Delete the check
                                        _data.delete('checks', checkId, (err) =>{
                                            if(err){
                                                deletionErrors: true;
                                            }else {
                                                checksDeleted++;
                                                if(checksDeleted == checksToDelete){
                                                    if(!deletionErrors){
                                                        callback(200);
                                                    } else {
                                                        callback(500, {'Error': 'Errors encountered while attempting deletion of all user checks. all checks may not have been deleted from the system successfully'})
                                                    }
                                                }
                                            }
                                        })
                                    })

                                } else {
                                    callback(200);
                                }
                            }else {
                                callbacK(500, {'Error': 'Could not delete the specified user'})
                            }
                        })
                    }else {
                        callback(400, {'Error': 'Could not find the specified user'});
                    }
                })
            }else{
                callback(403, {'Error': 'Missing required token in header, or token is invalid'})
            }
        });


    }else {
        callback(400, {'Error' : 'Missing required field'})
    }
};


// Tokens
handlers.tokens = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._tokens[data.method](data, callback);
    }else{
        callback(405); //Error code for method not allowed
    }
}

// Container for all the tokens methods
handlers._tokens = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = (data, callback) => {
    // Check that all required fields are present
    let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    if(phone && password){
        // Lookup the user who matches that phone number
        _data.read('users', phone, (err, userData) => {
            if(!err && userData){
                // Hash the sent password, and compare it to the password stored in the user object
                const hashedPassword = helpers.hash(password);
                if(hashedPassword == userData.hashedPassword){
                    // If valid, create a new token with a random name, set expiration date one hour into the future
                    const tokenId = helpers.createRandomString(20); // @TODO make this function

                    const expires = Date.now() + 1000 * 60 * 60;
                    const tokenObject = {
                        'phone' : phone,
                        'id' : tokenId,
                        'expires' : expires
                    }

                    // Store the token
                    _data.create('tokens', tokenId, tokenObject, (err) =>{
                        if(!err){
                            callback(200, tokenObject);
                        } else {
                            callback(500, {'Error' : 'Could not create the new token'})
                        }
                    })
                }else {
                    callback('400', {'Error': 'Password did not match the specified users stored password'})
                }
            } else {
                callback(400, {'Error' : 'Could not find the specified user'})
            }
        })

    } else {
        callback(400, {'Error' : 'Missing required field(s)'});
    }
};

// Tokens - get
// Required data : id
// Optional data: none
handlers._tokens.get = (data, callback) => {
    // Check that the id is valid
    let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.length == 20 ? data.queryStringObject.id : false;
    if(id){
        //Lookup the token
        _data.read('tokens', id, (err, tokenData) => {
            if(!err && tokenData){
                callback(200, tokenData);
            }else {
                callback(404);
            }
        })
    }else {
        callback(400, {'Error' : 'Missing required field'})
    }

};
// Tokens - put
// Required data : id, extend
// Optional data: none
handlers._tokens.put= (data, callback) => {
    let id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    let extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
    if( id && extend) {
        //Look up the token
        _data.read('tokens', id, (err, tokenData) =>{
            if(!err && tokenData) {
                // Check to make sure the token isn't already expired
                if(tokenData.expires > Date.now()){
                    // Set the expiration an hour from now
                    tokenData.expires = Date.now() + 1000 * 60 * 60;


                    // Store the new update
                    _data.update('tokens', id, tokenData, (err) =>{
                        if(!err){
                            callback(200);
                        }else {
                            callback(500, {'Error' : 'Could not update the tokens expiration'});
                        }
                    })
                } else {
                    callback(400, {'Error': 'The token has already expired and cannot be extended'})
                }
            } else {
                callback(400, {'Error': 'Specified token does not exist'})
            }
        })
    } else {
        callback(400, {'Error' : 'Missing required field(s) or fields are invalid'})
    }
        
};
// Tokens - delete
handlers._tokens.delete = (data, callback) => {
    // Check that the id is valid
    let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.length == 20 ? data.queryStringObject.id : false;
    if(id){
        //Lookup the user
        _data.read('tokens', id, (err, data) => {
            if(!err && data){
                _data.delete('tokens', id, (err) =>{
                    if(!err){
                        callback(200);
                    }else {
                        callbacK(500, {'Error': 'Could not delete the specified user'})
                    }
                })
            }else {
                callback(400, {'Error': 'Could not find the specified user'});
            }
        })
    }else {
        callback(400, {'Error' : 'Missing required field'})
    }

};

// Verify if a given token id is currently valid
handlers._tokens.verifyToken = (id, phone, callback) =>{
    // Look up the token
    _data.read('tokens', id, (err, tokenData) =>{
        if(!err){
            // Check that the token is for the given user and has not expired
            if(tokenData.phone == phone && tokenData.expires > Date.now()){
                callback(true);
            } else{
                callback(false);
            }
        } else{
            callback(false);
        }
    });
};

// Checks
handlers.checks = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._checks[data.method](data, callback);
    }else{
        callback(405); //Error code for method not allowed
    }
}

// Container for all the checks methods
handlers._checks = {};

// Checks - post
// Required data: protocol, url, method, successCodes, timeoutSeconds
// Optional data: none

handlers._checks.post = (data, callback) =>{
    //Validate all of these inputs
    const protocol = typeof(data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false ? data.payload.protocol : false;
    const method = typeof(data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method: false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes: false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false ? data.payload.protocol : false


    if(protocol && url && method && successCodes && timeoutSeconds){
        // Get the token from the headers
        const token = typeof(data.headers.token) == 'string' ? data.headers.token: false;

        // Look up the user by readin gthe token.
        _data.read('tokens', token, (err, tokenData) =>{
            if(!err && tokenData){
                const userPhone = tokenData.phone;

                // Look up the user by phone
                _data.read('users', userPhone, (err, userData) =>{

                    if(!err && userData){
                        // Identify which checks the user already has
                        userChecks = typeof(userData.checks) == "object" && userData.checks instanceof Array  ? userData.checks: [];

                        // Verify that the user has less than the number of max checks per user
                        if(userChecks.length < config.maxChecks){
                            // Create a random id for the check
                            const checkId = helpers.createRandomString(20);
                            
                            // Create the check object and store the users phone
                            const checkObject = {
                                'id' : checkId,
                                'userPhone': userPhone,
                                'protocol': protocol,
                                'url': url,
                                'method' : method,
                                'successCodes': successCodes,
                                'timeoutSeconds': timeoutSeconds
                            };

                            // Save the object to disk
                            _data.create('checks', checkId, checkObject, (err) =>{
                                if(!err){
                                    // Add the check id to the user's object
                                    userData.checks = userChecks;
                                    userData.checks.push(checkId);

                                    // Save the new user data
                                    _data.update('users', userPhone, userData, (err) =>{
                                        if(!err){
                                            // Return the data about the new check to the request
                                            callback(200, checkObject);
                                        } else{
                                            callback(500, {'Error': 'Could not update the user with the new check'})
                                        }
                                    });
                                }else {
                                    callback(500, {'Error': 'Could not create the new check'})
                                }
                            })

                        }else {
                            callback(400, {'Error': 'The user already has the maximum numbers of checks ('+config.maxChecks + ')'});
                        }
                    }else{
                        callback(403);
                    }
                });
            }else{
                callback(403);
            }
        });
        //
    } else {
        callback(400, {'Error': 'Missing required inputs or inputs are invalid'});
    }
};

// Checks - get
// Required data: id
// Optional data: none
handlers._checks.get = (data, callback) =>{
    // Check that the id is valid
    let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.length == 20 ? data.queryStringObject.id : false;

    if(id){

        //Lookup the check
        _data.read('checks', id, (err, checkData) =>{
            if(!err && checkData) {
                //Get the token from the headers
                const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

                // Verify that the given token is valid and belongs to the user who created the check
                handlers._tokens.verifyToken(token, checkData.userPhone, (tokenIsValid) =>{
                    if(tokenIsValid){
                        // Return the check data
                        callback(200, checkData);
                        
                    }else {
                        callback(403)
                    }
                });

            } else{
                callback(404);
            }
        });



    }else {
        callback(400, {'Error' : 'Missing required field'})
    }
};

// Checks - put
// Required data: id
// Optional Data: protocol, url, method, successCodes, timeoutSeconds (at least 1 must be sent)
handlers._checks.put = (data, callback) =>{
    //Check that the id is valid
    let id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    // Check for the optional fields
    //Validate all of these inputs
    const protocol = typeof(data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false ? data.payload.protocol : false;
    const method = typeof(data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method: false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes: false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false ? data.payload.protocol : false

    // Check to make sure id is valid
    if(id){
        // Check to make sure one or more options fields has been sent
        if(protocol || url  || method|| successCodes || timeoutSeconds){
            _data.read('checks', id, ( err, checkData) =>{
                if(!err && checkData){
                    //Get the token from the headers
                    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

                    // Verify that the given token is valid and belongs to the user who created the check
                    handlers._tokens.verifyToken(token, checkData.userPhone, (tokenIsValid) =>{
                        if(tokenIsValid){
                            // Update the check where necessary
                            if(protocol){
                                checkData.protocol = protocol;
                            }
                            if(url){
                                checkData.url = url;
                            }
                            if(method){
                                checkData.method = method;
                            }
                            if(successCodes){
                                checkData.successCodes = successCodes;
                            }
                            if(timeoutSeconds){
                                checkData.timeoutSeconds = timeoutSeconds;
                            }
                            

                            //Store the new updates
                            _data.update('checks', id, checkData, (err) =>{
                                if(!err){
                                    callback(200);
                                }else{
                                    callback(500, {'Error': 'Could not update the check'})
                                }
                            });
                            
                        }else {
                            callback(403)
                        }
                    });
                } else{
                    callback(400, {'Error': 'CheckId did not exist'})
                }
            });
        }else{
            callback(400, {'Error': 'Missing fields to update'})
        }

    }else{
        callback(400, {'Error': 'Missing required field'})
    }
  


}

// Checks - delete
// Required data: id
// Optional data: none
handlers._checks.delete = (data, callback) => {
    // Check that the id is valid
    let id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.length == 20 ? data.queryStringObject.id : false;
    if(id){
       
        // Look up the check
        _data.read('checks', id, (err, checkData) =>{
            if(!err && checkData){
                //Get the token from the headers
                const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
                
                // Verify that the given token is valid for the phone number
                handlers._tokens.verifyToken(token, checkData.userPhone, (tokenIsValid) =>{
                    if(tokenIsValid){
                        
                        // Delete the check data
                        _data.delete('checks', id, ( err) =>{
                            if(!err){
                                _data.read('users', checkData.userPhone, (err,userData) =>{
                                    if(!err && userData){
                                        // Identify which checks the user already has
                                        userChecks = typeof(userData.checks) == "object" && userData.checks instanceof Array  ? userData.checks: [];

                                        // Remove the deleted check from their list of checks
                                        var checkPosition = userChecks.indexOf(id);

                                        if(checkPosition > -1){
                                            userChecks.splice(checkPosition, 1);
                                            // Re-save the user's data
                                            _data.update('users', checkData.userPhone, userData, ( err) =>{
                                                if(!err){
                                                    callback(200);
                                                }else{
                                                    callback(500, {'Error': 'Could not update the user'})
                                                }
                                            });
                                        }else{
                                            callback(500, {'Error': 'Could not find the check on the users object, so could not remove it'})
                                        }
                                    }else {
                                        callback(500, {'Error': 'Could not find the user who created the check, so could not remove the check from the user object'})
                                    }
                                })
                            }else{
                                callback(500, {'Error': 'Could not delete the check data'})
                            }
                        })
                    } else {

                    }
                });
            }else{
                callback(400, {'Error': 'Could not look up the check'})
            }
        });
    }else {
        callback(400, {'Error' : 'Missing required field'})
    }

};

// Export the module
module.exports = handlers;