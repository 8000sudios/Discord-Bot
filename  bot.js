//Use nodemon
const config = require("./config.json");

const commando = require('discord.js-commando');
const bot = new commando.Client({
	owner: config.owner,
	commandPrefix: config.prefix
});

bot.registry.registerGroup('administrative', 'Administrative commands');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(config.token);
