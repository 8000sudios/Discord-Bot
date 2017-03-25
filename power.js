const config = require("./config.json");

module.exports = {

  getPower: function(user, thing) {
    let temp = 0;
    for (var x = 0; x < config.roles.length; x++) {
      if (thing.roles.exists("name", config.roles[x][0])) {
        if (user.roles.has(thing.roles.find("name", config.roles[x][0]).id)) {
          if (config.roles[x][1] > temp) {
            temp = config.roles[x][1];
          }
        }
      }
    }
    return temp;
  }
}
