/* 
 * Primary file for API
 * 
*/

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//the server should respond to all requests with a string

var server = http.createServer( (req, res) => {
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
            payload: buffer
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


    
});


//Start the server, and listen on port 3000
server.listen(3000, () => {
    console.log("The server is listening now on port 3000");
})

// Define the handlers 
var handlers = {};

// Sample handlers;
handlers.sample = (data, callback) => {
    // callback a http status code, and  a payload object
    callback(406, {'name' : 'sample handler'})
};

// Not found handlers
handlers.notFound = (data, callback) => {
    callback(404);
};

// Define a request router
var router = {
    'sample' : handlers.sample
};