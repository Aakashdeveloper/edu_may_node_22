let http = require('http');

// req > what we will send to server params,queryParams,body
// res > what server will send

let server = http.createServer(function(req, res){
    res.write('<h1>THis is NodeJS application</h1>')
    res.end()
})

server.listen(9870)