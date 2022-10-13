// node_modules
const express = require('express');

// controllers
const UsersController = require('./controllers/UsersController.js');

// constants
const port = process.env.PORT || Number('3001');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running at port: "${port}".`);
});

UsersController.initialize(app);
