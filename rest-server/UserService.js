const UserDao = require("./UserDao.js");

class UserService {
  constructor(app) {
    this.app = app;
  }

  static async getUser() {
    return UserDao.getUser();
  } 

  static async setFirstName(firstName) {
    if(firstName === "John") {
      throw Error("John is not allowed");
    } else {
      return UserDao.setFirstName(firstName);
    }
  }
}
module.exports = UserService;
