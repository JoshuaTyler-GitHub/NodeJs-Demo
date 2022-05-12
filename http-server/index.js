// node_modules
const http = require("http");

// constants
const port = process.env.PORT || Number("3000");

const server = http.createServer((request, response) => {
  response.statusCode = Number("200");
  response.setHeader('Content-Type', 'text/html');
  const content = ("<h1>Hello, World!</h1>");
  response.end(content);
});

server.listen(port, () => {
  console.log(`Server running at port: "${port}".`);
});
