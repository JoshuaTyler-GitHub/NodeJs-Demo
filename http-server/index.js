const http = require("http");

const port = process.env.PORT || Number("3000");

const server = http.createServer((request, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/html')
  response.end('<h1>Hello, World!</h1>')
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
});
