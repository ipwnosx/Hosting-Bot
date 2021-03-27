const Discord = require("discord.js");
const Bot = new Discord.Client();
exports.HelperLibrary = require("./lib/Prototypes.js");
let Config = require("./config.json");
let colorizer = require("chalk")
let PREFIX = Config.PREFIX;
exports.PREFIX = PREFIX;
exports.chalk = colorizer;

Bot.on("ready", () => {
    let d = new Date();
    console.log(`[${d.toGermanTimeString()}] ${colorizer.cyan(Bot.user.username)} is ready!`);
    
});

let CommandProcessor = require("./lib/CommandProcessor.js");


Bot.on("message", message => {
    CommandProcessor.Process(message, message.author, message.channel, this, Discord);
});


Bot.login(Config.TOKEN);

