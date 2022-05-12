const UserService = require("./UserService.js");

class UserController {
  static app;

  static initialize(app) {
    console.log("UserController initialized");
    UserController.app = app;

    app.get('/user', async (request, response) => {
      console.debug("GET /user called");
      response.send(user);
    });
    
    app.put('/user', async (request, response) => {
      console.debug("PUT /user called");
      const { body } = request;
      const { firstname } = body;
      try {
        const user = await UserService.setFirstName(firstname);
        response.send(user);
      }
      catch(error) {
        response.status(Number("400")).send("John is not allowed");
      }
    });
  }
}
module.exports = UserController;
