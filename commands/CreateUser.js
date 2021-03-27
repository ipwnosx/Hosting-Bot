const node = require('nodeactyl');
const application = node.Application;
application.login('WEBSITE', 'APIKEY', (logged_in, msg) => {
    console.log(logged_in);
})
module.exports = {
    aliases: ['createuser'],
    Execute: function(message, user, channel, arguments, context, discord) {
	let messageArray = message.content.split(" ");
	const args = messageArray.slice(1);
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Administrators only");
    let Uname = args[0]
	let Upassword = args[1]
	let email = args[2] 
	let firstname = args[3]
	let lastname = args[4]
	if(!Uname){
		return channel.send("Incorrect usage: !createuser {username} {password} {email} {firstname} {lastname}")
	}
	if (!Upassword){
		return channel.send("Incorrect usage: !createuser {username} {password} {email} {firstname} {lastname}")
	}
	if (!email){
		return channel.send("Incorrect usage: !createuser {username} {password} {email} {firstname} {lastname}")
	}
	if (!firstname){
		return channel.send("Incorrect usage: !createuser {username} {password} {email} {firstname} {lastname}")
	}
	if (!lastname){
		return channel.send("Incorrect usage: !createuser {username} {password} {email} {firstname} {lastname}")
	}
application.createUser(Uname, Upassword, email, firstname, lastname, false, "en").then(user => {
}).catch(err => {
    console.log(err);
})
    }
}