const user = {
  firstname: "John",
  lastname: "Smith",
};

class UserDao {
  static async setFirstName(firstName) {
    user.firstname = String(firstName);
    return user;
  }
}
module.exports = UserDao;
