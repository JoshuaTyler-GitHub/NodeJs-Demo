class UsersRepository {
  static users = {
    'a54d6566-bfdc-449a-9231-439b344c6492': {
      age: 25,
      name: 'John',
      favoriteColor: 'green',
    },
    '81ce3f07-e7e9-4ddd-82f6-7d3d5b53db6d': {
      age: 30,
      name: 'Jane',
      favoriteColor: 'yellow',
    },
    '574a5b2c-0ee7-44b1-847d-0f1eb7ec7cb0': {
      age: 35,
      name: 'Jack',
      favoriteColor: 'red',
    }
  };


  
  /**
   * @param {Object} userData
   * @returns {Promise<Object>} usersObject
   */
   static async createUser(userData) {
    const userId = Math.random().toString(36);
    UsersRepository.users[userId] = userData;
    return { ...UsersRepository.users[userId] };
  }

  /**
   * @param {UsersFilter} filter
   * @returns {Promise<Object>} usersObject
   */
  static async getUsers(filter = {}) {
    return { ...UsersRepository.users };
  }
}
module.exports = UsersRepository;


