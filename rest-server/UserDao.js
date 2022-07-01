const user = {
  firstname: "John",
  lastname: "Smith",
};

class UserDao {
  static async getUser() {
    return user;
  }

  static async setFirstName(firstName) {
    user.firstname = String(firstName);
    return user;
  }
}
module.exports = UserDao;
