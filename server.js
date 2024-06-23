import * as http from 'http'
import * as ns from 'node-static'

const file = new ns.Server('./test')
const port = 8080

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response)
    }).resume()
}).listen(port)

console.log(`http://localhost:${port}`)