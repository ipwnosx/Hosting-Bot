const Discord = require("discord.js");
module.exports = {
    aliases: ['createserver'],
    Execute: function(message, user, channel, arguments, context, discord) {
	const Node = require('nodeactyl');
	const application = Node.Application;
	application.login('WEB', 'APIKEY', (logged_in, msg) => {
    console.log(logged_in);
})
    const messageArray = message.content.split(" ");
    const args = messageArray.slice(1);
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Administrators only");
    let Nserver = args[0]
	let OwnerID = args[1]
	let PackID = args[2] 
	let EggID = args[3]
	let Ram = args[4]
	let diskspace = args[4]
	if(!Nserver){
		channel.send("Incorrect usage: !createserver {name of server} {ownerid} {packid} {eggid} {ram (MB)} {disk space}")
	}
	if (!OwnerID){
		channel.send("Incorrect usage: !createserver {name of server} {ownerid} {packid} {eggid} {ram (MB)} {disk space}")
	}
	if (!PackID){
		channel.send("Incorrect usage: !createserver {name of server} {ownerid} {packid} {eggid} {ram (MB)} {disk space}")
	}
	if (!EggID){
		channel.send("Incorrect usage: !createserver {name of server} {ownerid} {packid} {eggid} {ram (MB)} {disk space}")
	}
	if (!Ram){
		channel.send("Incorrect usage: !createserver {name of server} {ownerid} {packid} {eggid} {ram (MB)} {disk space}")
	}
	if (!diskspace){
		channel.send("Incorrect usage: !createserver {name of server} {ownerid} {packid} {eggid} {ram (MB)} {disk space}")
	}
application.createServer("latest", Nserver, OwnerID, "PackID", EggID, "DockerImage", "StartupCMD", Ram, "Swap", diskspace, "IO", "CpuCores", "1", "AmtOfAllocations").then(res => {
}).catch(error =>{
    console.log(error);
})
    }
}