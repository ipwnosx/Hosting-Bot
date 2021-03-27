const fs = require("fs")
const Cooldown = require('./Cooldown').Cooldown

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}



exports.SyncObject = function(file, object){
    fs.writeFile(file, JSON.stringify(object, undefined, "\t"), () => {});
}

exports.InterpretConfigFile = function(guild, clientInstance, defaultConfig) {
    
    const FunctionMap = {
        'NotificationChannel': (rID) => guild.channels.get(rID)

    }

    return new Promise((resolve, reject) => {
        fs.exists(`./config/guilds/${guild.id}.json`, (exists) => {
            if(exists){
                fs.readFile(`./config/guilds/${guild.id}.json`, (error, data) => {
                    let Obj = JSON.parse(data.toString());
        
                    (function recur(object) {
                        for(let key in object){
                            if(key in FunctionMap || typeof object[key] === 'object'){
                                if(typeof object[key] != "object"){
                                    object[key] = FunctionMap[key](object[key])
                                }else{
                                    if(key.startsWith("CDN_")){
                                        object[key] = new Cooldown(object[key].CooldownEnd, true)
                                    }else{
                                        recur(object[key])
                                    }
                                }
                            }
                        }
                    })(Obj);

                    resolve(Obj);
                }) 
            }else{
                resolve(defaultConfig)
            }
        })
    })
}
function recurse(node) {
    for(var i = 0, count = node.children.length; i < count; i++) {
        recurse(node.children[i]);
    }
} 

exports.UpdateConfig = function(guild, configObject) {
    console.log(`[CONFIG] Updating config for ${guild.id}`);
    const ObjectMap = {
        'NotificationChannel': (r) => r.id
    }

    return new Promise((resolve, reject) => {
        let SaveCpy = clone(configObject);
        // console.log(SaveCpy, configObject)
        for(let key in SaveCpy){
            if(key in ObjectMap){
                if(SaveCpy[key] !== undefined && SaveCpy[key] !== null){
                    SaveCpy[key] = ObjectMap[key](SaveCpy[key])
                }
            }
        }
        
        fs.writeFile(`./config/guilds/${guild.id}.json`, JSON.stringify(SaveCpy, undefined, "\t"), (error) => {
            if(error) {console.error(error + ` occured while saving configuration for guild ${guild.id}`); reject(false)}
            resolve(true)
        })
    })
}