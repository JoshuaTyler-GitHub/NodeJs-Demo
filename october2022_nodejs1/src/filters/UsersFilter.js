class UsersFilter {
  constructor(params) {
    const { age, id, name, favoriteColor } = params;
    if(age) {
      this.ageExactMatch = Number(age);
    }

    if(id) {
      this.idExactMatch = String(id);
    }

    if(name) {
      this.nameExactMatch = String(name);
    }

    if(favoriteColor) {
      this.favoriteColorExactMatch = String(favoriteColor);
    }
  }

  filter(usersObject) {
    const { ageExactMatch, idExactMatch, nameExactMatch, favoriteColorExactMatch } = this;
    const filteredUsers = {};
    Object.entries(usersObject).forEach(([userId, user]) => {
      // age filters
      
      // favoriteColor filters

      // id filters
      if(idExactMatch && !this.filterIdExactMatch(userId, ageExactMatch)) {
        return false;
      }

      // name filters

      // set user that matches all filters
      filteredUsers[userId] = user;
    });
    return filteredUsers;
  }

  filterIdExactMatch(id, matchId) {
    return id === matchId;
  }
}
module.exports =  UsersFilter;
