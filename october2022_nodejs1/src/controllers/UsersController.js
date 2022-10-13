const UsersService = require('../services/UsersService');

class UsersController {

  static initialize(app) {
    console.log('Initializing UsersController...');
  
    app.get('/', (request, response) => {
      const content = ('<h1>Hello, World!</h1>');
      response.status(200).send(content)
    });

    app.get('/users', async (request, response) => {
      const { body } = request;
      console.log('body', body);
      const content = await UsersService.getUsers();
      response.status(200).send(content)
    });

    app.post('/users', async (request, response) => {
      const { body } = request;
      console.log('body', body);
      try {
        const content = await UsersService.createUser(body);
        response.status(201).send(content)
      } catch(error) {
        response.status(400).send(error.message);
      }
    });

  }

}
module.exports = UsersController;
