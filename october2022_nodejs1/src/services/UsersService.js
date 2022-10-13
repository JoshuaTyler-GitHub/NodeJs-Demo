// filters
const UsersFilter = require('../filters/UsersFilter.js');

// repositories
const UsersRepository = require('../repositories/UsersRepository.js');

class UsersService {
  /**
   * @param {Object} filterParams
   * @returns {Promise<Object>} usersObject
   */
  static async getUsers(filterParams = {}) {
    const usersFilter = new UsersFilter(filterParams);
    const allUsers = await UsersRepository.getUsers();
    return usersFilter.filter(allUsers);
  }

  /**
   * @param {Object} requestBody
   * @returns {Promise<Object>} userObject
   * @throws {Error} John is not allowed
   */
  static async createUser(requestBody) {
    // verify request body is valid
    const { userData } = requestBody;
    console.log('userData', userData);

    // verify userData meets business requirements
    const { name } = userData;
    if(name === ' John') {
      throw new Error('John is not allowed');
    }
    return UsersRepository.createUser(userData);
  }
}
module.exports = UsersService;
