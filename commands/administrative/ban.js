// NO is bot check
// NO is guild owner check

const commando = require('discord.js-commando');
const config = require("../../config.json");
const pow = require("../../power.js")
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
    let power = pow.getPower(message.member, message.guild);
    if (requirePower <= power) {
      if (message.mentions.users.first()) {
        let ban = message.guild.member(message.mentions.users.first());
        let banPower = pow.getPower(ban, message.guild);
        if (power > banPower) {
          if (ban.bannable == false) {
            if(ban.id == message.guild.ownerID) {
              return message.reply("You cannot ban the server owner.");
            } else return message.reply("You a) cannot ban the bot OR b) the bot does not have the correct permissions to ban this person (contact " + message.guild.owner + ")");
          } else {
            ban.ban();
            return message.reply("User " + message.mentions.users.first() + " has been banned.");
          }
        } else return message.reply("You dont not have permissions to ban this person.");
      } else return message.reply("Please mention a user.");
    } else return message.reply("You don not have permissions to use this command.");
  }
}

module.exports = ban;
