/* 
 * Primary file for API
 * 
*/

//Dependencies
const http = require('http');
const url = require('url');

//the server should respond to all requests with a string

var server = http.createServer( (req, res) => {
    //get URL and parse it
    var parsedUrl = url.parse(req.url, true);
    
    //get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g ,'');

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;


    //send the response
    res.end("Hello World\n");

    //log what path was requested
    console.log('Request received with these headers', headers);
    
});


//Start the server, and listen on port 3000
server.listen(3000, () => {
    console.log("The server is listening now on port 3000");
})