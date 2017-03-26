const commando = require('discord.js-commando');
const config = require("../../config.json");
const util = require("../../util.js")


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
    let r = "";
    
    power = util.getPower(message.member, message.guild);

    if (power >= rPower) {
      if (message.mentions.users.first()) {
        let kick = message.guild.member(message.mentions.users.first());
        userPower = util.getPower(kick, message.guild);
        if (power > userPower) {
          if(kick.kickable == false) {
            if(kick.id == message.guild.ownerID) {
              return message.reply("You cannot kick the server owner.");
            } else return message.reply("You a) cannot kick the bot OR b) the bot does not have the correct permissions to kick this person (contact " + message.guild.owner + ")");
          } else {
            let arr = args.split('-');
            for (var i = 1; i < arr.length; i++) {
              if (arr[i].slice(0, 1) == "r" || arr[i].slice(0, 1) == "R") {
                r = arr[i].slice(2);
              }
            }
            kick.kick();
            util.log(message, message.member, "kicked", kick, r);
            if (r != "") {
              message.reply('User ' + message.mentions.users.first() + ' has been kicked. For reason: ' + r);
            } else return message.reply('User ' + message.mentions.users.first() + ' has been kicked.');
          }
        } else return message.reply("You dont have permission to kick this user.")
      } else return message.reply("Please mention a user")
    } else return message.reply("You dont have permission for this command.");
  }
}

module.exports = kick;
