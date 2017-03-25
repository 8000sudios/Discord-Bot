const commando = require('discord.js-commando');
const config = require("../../config.json");
const util = require("../../util.js")


var power = 0;
var rPower = 2;
var userPower = 0;

class test extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'test',
      group: 'administrative',
      memberName: 'test',
      description: 'test a user',
      //aliases: ['k']
    });
  }

  async run(message, args) {
    message.reply(args);
  }
}

module.exports = test;
