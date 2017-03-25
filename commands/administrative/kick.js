// NO is bot check
// NO is guild owner check

const commando = require('discord.js-commando');
const config = require("../../config.json");
const pow = require("../../power.js")


var power = 0;
var rPower = 2;
var userPower = 0;

class kick extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'administrative',
      memberName: 'kick',
      description: 'kicks a user',
      //aliases: ['k']
    });
  }

  async run(message, args) {
    power = 0;
    userPower = 0;

    //Calculate user power
    power = pow.getPower(message.member, message.guild);

    if (power >= rPower) {
      if (message.mentions.users.first()) {
        userPower = pow.getPower(message.guild.member(message.mentions.users.first()), message.guild);
        if (power > userPower) {
          let kick = message.guild.member(message.mentions.users.first());
          if(kick.kickable == false) {
            message.reply("Please contact server owner {bot roles might be bellow user role}");
          } else {
            kick.kick();
            message.reply('User ' + message.mentions.users.first() + ' has been kicked.');
          }
        } else return message.reply("You dont have permission to kick this user.")
      } else return message.reply("Please mention a user")
    } else return message.reply("You dont have permission for this command.");
  }
}

module.exports = kick;
