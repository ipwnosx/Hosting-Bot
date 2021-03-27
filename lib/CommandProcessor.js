const fs = require("fs");
const dir = 'commands';

let CommandTable = {

}

fs.readdir('./'+dir, {}, function(err, files) {
    if(err){
        console.error("[C] Couldnt Read '"+dir+"' Directory, does it exist?");
    }
    files.forEach(file => {
        
        let Module = require('../'+dir+'/'+file);
        if(!Module.disabled){
            console.log("[+] Importing Command ./"+dir+'/'+file);
            if(Module.aliases && Module.aliases instanceof Array){
                Module.aliases.forEach(alias => CommandTable[alias.toLowerCase()] = Module);
            }else{
                if(Module.Command){
                    CommandTable[Module.Command.toLowerCase()] = Module;
                }else{
                    console.error("[-] "+file+" has no 'aliases' array nor a 'Command' variable that holds the invocation!");
                }
            }
        }else{
            console.log("[-] Ignoring disabled command ./"+dir+'/'+file);
        }
    })
})


module.exports = {

    Process: function(message, user, channel, context, discord){
        if(message.content.substring(0, context.PREFIX.length) === context.PREFIX){
            let Command = message.content.substring(context.PREFIX.length);
            let Splitted = Command.split(" ");
            let BaseCommand = Splitted[0];
            let Arguments = Splitted.slice(1);

            if(CommandTable[BaseCommand]){
                if(CommandTable[BaseCommand].Execute){
                    CommandTable[BaseCommand].Execute(message, user, channel, Arguments, context, discord);
                }else{
                    console.error("[C] Handler for " + BaseCommand + " has no 'Execute' function which is needed!");
                }
            }
        }
    }

}