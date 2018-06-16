/* 
 * Server-related tasks
 */

//Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('./handlers');
const helpers = require('./helpers');
const path = require('path');
const util = require('util');
const debug = util.debuglog('server');

// Instantiate the server module object
const server = {};



//Instantiate the HTTP server
server.httpServer = http.createServer( (req, res) => {
    server.unifiedServer(req,res);
});



// Instantiate the HTTPS server and read in server options from OpenSSL generated files
server.httpsServerOptions = {
    'key' : fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert' : fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOptions,  (req, res) => {
    server.unifiedServer(req,res);
})




// All the server logic for both the http and https server
server.unifiedServer = (req,res) => {
    //get URL and parse it
    var parsedUrl = url.parse(req.url, true);
        
    //get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g ,'');

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method and make case uniform
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder('utf-8'); 
    var buffer = '';
    req.on('data', (data)=>{
        buffer += decoder.write(data);
    });
    req.on('end', ()=>{
        buffer += decoder.end();

        // Choose the handler this request should go to. If one is not found, use 404 route
        var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            trimmedPath : trimmedPath,
            queryStringObject: queryStringObject,
            method: method,
            headers: headers,
            payload: helpers.parseJsonToObject(buffer)
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            //  If the response is 200, print green otherwise print red
            if(statusCode == 200){
                debug('\x1b[32m%s\x1b[0m', method.toUpperCase()+' /'+ trimmedPath+ ' ' +statusCode);
            }else{
                debug('\x1b[31m%s\x1b[0m', method.toUpperCase()+' /'+ trimmedPath+ ' ' +statusCode);
            }
        });

    });


}


// Define a request router
server.router = {
    'ping' : handlers.ping,
    'users' : handlers.users,
    'tokens' : handlers.tokens,
    'checks' : handlers.checks
};

// Init script
server.init = () =>{
    // Start the HTTP server
    //Start the HTTPserver
    server.httpServer.listen(config.httpPort, () => {
        console.log('\x1b[36m%s\x1b[0m', `The server is listening now on port ${config.httpPort} in ${config.envName} mode`);
    });

    // Start the HTTPS server
    // Start the HTTPS server
    server.httpsServer.listen(config.httpsPort, () => {
        console.log('\x1b[35m%s\x1b[0m',`The server is listening now on port ${config.httpsPort} in ${config.envName} mode`);
    });
}

// Export the moduler
module.exports = server;