// node_modules
const express = require('express');
const UserController = require("./UserController.js");

// constants
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || Number("3001");

app.listen(port, () => {
  console.log(`Server running at port: "${port}".`);
});

UserController.initialize(app);
