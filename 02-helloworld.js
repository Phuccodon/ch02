const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serverStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(_dirname + path, (err, data) => {
    // fs.readFile(path, (err, data) => {
    if(err) {
        res.writeHead(500, {'Content-Type': 'text/plain' })
        return res.end('500 - Internal Error')
    }
    res.writeHead(responseCode, { 'Content-Type': contentType })
    res.end(data)
  })
}
const server = http.createServer((req,res) => {
  // normalizeb url by removing querystring, optional trailing slash, and
  // making lowercase
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  switch(path) {
    case '':
      serverStaticFile(res, 'public/home.html','text/html')
      break
    case '/about':
      serverStaticFile(res, 'public/about.html','text/html')
      break
    case 'image/logo (1).png':
      serverStaticFile(res, 'public/404.html','image/html')
      break
    default:
      serverStaticFile(res, 'public/404.html','text/html', 404)
      break
  }
})

server.listen(port, () => console.log(`server started on port ${port}; ` +
  'press Ctrl-C to terminate....'))