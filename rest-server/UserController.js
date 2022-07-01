const UserService = require("./UserService.js");

class UserController {
  static app;

  static initialize(app) {
    console.log("UserController initialized");
    UserController.app = app;

    app.get('/user', async (request, response) => {
      console.debug("GET /user called");
      const user = await UserService.getUser();
      response.send(user);
    });
    
    app.put('/user/{id}/loans/{loanId}', async (request, response) => {
      console.debug("PUT /user called");
      const { body, params } = request;
      const { firstname } = body;
      const { loanId, id } = params;
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
