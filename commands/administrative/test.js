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
    util.log(message, "im a user LOL", "action", "against", "reason");

    let arr = args.split('-');

    for (var i = 1; i < arr.length; i++) {
      if (arr[i].slice(0, 1) == "r" || arr[i].slice(0, 1) == "R") {
        message.reply(arr[i].slice(2));
      } else if (arr[i].slice(0, 1) == "d" || arr[i].slice(0, 1) == "D") {
        message.reply(arr[i].slice(2));
      }
    }
  }
}

module.exports = test;
