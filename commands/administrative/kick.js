const commando = require('discord.js-commando');
const config = require("../../config.json");
var power = 0;
var rPower = 2;
var userPower = 0;

class kick extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'administrative',
      memberName: 'kick',
      description: 'replys with Pong ',
      aliases: ['k']
    });
  }

  async run(message, args) {
    power = 0;
    userPower = 0;

    //Calculate user power
    for (var x = 0; x < config.roles.length; x++) {
      if (message.guild.roles.exists("name", config.roles[x][0])) {
        if (message.member.roles.has(message.guild.roles.find("name", config.roles[x][0]).id)) {
          if (config.roles[x][1] > power) {
            power = config.roles[x][1];
          }
        }
      }
    }

    if (power >= rPower) {
      if (message.mentions.users.first()) {
        for (var x = 0; x < config.roles.length; x++) {
          if (message.guild.roles.exists("name", config.roles[x][0])) {
            if (message.guild.member(message.mentions.users.first()).roles.has(message.guild.roles.find("name", config.roles[x][0]).id)) {
              if (config.roles[x][1] > userPower) {
                userPower = config.roles[x][1];
              }
            }
          }
        }

        if (power > userPower) {
          message.guild.member(message.mentions.users.first()).kick();
          message.reply('User ' + message.mentions.users.first() + ' has been kicked.');
        } else return message.reply("You dont have permission to kick this user.")
      } else return message.reply("Please mention a user")
    } else {
      message.reply("You dont have permission for this command.");
    }
  }

}

module.exports = kick;
