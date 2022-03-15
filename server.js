const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
        data: 'Hello World'
    }))
}).listen(4001, () => console.log('servidor esta rodando na porta 4001'))