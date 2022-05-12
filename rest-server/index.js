// node_modules
const express = require('express');

// constants
const app = express();
const port = process.env.PORT || Number("3000");
const USER_DATA = require("./userdata.json");

app.listen(port, () => {
  console.log(`Server running at port: "${port}".`);
});

app.get('/', (request, response) => {
  response.send("<h1>Hello, World!</h1>");
});

app.get('/users', (request, response) => {
  response.send(USER_DATA);
});
