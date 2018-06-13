/* 
 * Primary file for API
 * 
*/

//Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./lib/config');
const fs = require('fs');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');



//Instantiate the HTTP server
var httpServer = http.createServer( (req, res) => {
    unifiedServer(req,res);
});
//Start the HTTPserver
httpServer.listen(config.httpPort, () => {
    console.log(`The server is listening now on port ${config.httpPort} in ${config.envName} mode`);
});


// Instantiate the HTTPS server and read in server options from OpenSSL generated files
const httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions,  (req, res) => {
    unifiedServer(req,res);
})
// Start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
    console.log(`The server is listening now on port ${config.httpsPort} in ${config.envName} mode`);
});



// All the server logic for both the http and https server
var unifiedServer = (req,res) => {
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
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

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

            //log what path was requested
            console.log('returning this response: ', statusCode,  payloadString);
        });

    });


}


// Define a request router
var router = {
    'ping' : handlers.ping,
    'users' : handlers.users,
    'tokens' : handlers.tokens,
    'checks' : handlers.checks
};