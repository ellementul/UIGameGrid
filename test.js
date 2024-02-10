const static = require('node-static');
 
const port = 8080
const dir = './'

const fileServer = new static.Server()
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response)
    }).resume()
}).listen(8080)

console.log(`serving ${dir} at http://127.0.0.1:${8080}/`)