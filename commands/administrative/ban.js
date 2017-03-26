const commando = require('discord.js-commando');
const config = require("../../config.json");
const util = require("../../util.js")
const requirePower = 2;

class ban extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'administrative',
      memberName: 'ban',
      description: 'bans a user',
      //aliases: ['k']
    });
  }

  async run(message, args) {
    let power = util.getPower(message.member, message.guild);
    let d = 0;
    let r = "";

    if (requirePower <= power) {
      if (message.mentions.users.first()) {
        let ban = message.guild.member(message.mentions.users.first());
        let banPower = util.getPower(ban, message.guild);
        if (power > banPower) {
          if (ban.bannable == false) {
            if(ban.id == message.guild.ownerID) {
              return message.reply("You cannot ban the server owner.");
            } else return message.reply("You a) cannot ban the bot OR b) the bot does not have the correct permissions to ban this person (contact " + message.guild.owner + ")");
          } else {
            let arr = args.split('-');
            for (var i = 1; i < arr.length; i++) {
              if (arr[i].slice(0, 1) == "r" || arr[i].slice(0, 1) == "R") {
                r = arr[i].slice(2);
              } else if (arr[i].slice(0, 1) == "d" || arr[i].slice(0, 1) == "D") {
                if (parseInt(d) >= 0 && parseInt(d) <= 7) {
                  d = arr[i].slice(2);
                } else return message.reply("Make sure -d is between 0-7");
              }
            }
            ban.ban(d);
            util.log(message, message.member, "banned", ban, r);
            if(r != "") {
              return message.reply("User " + message.mentions.users.first() + " has been banned. For reason: " + r)
            } else {
              return message.reply("User " + message.mentions.users.first() + " has been banned.");
            }
          }
        } else return message.reply("You dont not have permissions to ban this person.");
      } else return message.reply("Please mention a user.");
    } else return message.reply("You don not have permissions to use this command.");
  }
}

module.exports = ban;
