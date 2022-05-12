const UserDao = require("./UserDao.js");

class UserService {
  constructor(app) {
    this.app = app;
  }

  static async setFirstName(firstName) {
    if(firstName === "John") {
      throw Error("John is not allowed");
    }
    else {
      return await UserDao.setFirstName(firstName);
    }
  }
}
module.exports = UserService;
