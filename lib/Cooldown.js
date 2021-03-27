const dependencies = require("./Prototypes");

class Cooldown {
    constructor(endsOn, fromJSON) {
        if(!fromJSON)
        this.CooldownEnd = new Date().getTime() + (endsOn);
        else
        this.CooldownEnd = endsOn
    }
    get ended(){
        return this.hasEnded();
    }
    hasEnded() {
        return new Date().getTime() >= this.CooldownEnd;
    }
    setCooldown(endsOn){
        this.CooldownEnd = new Date().getTime() + (endsOn);
    }
    get cooldown() {
        return this.CooldownEnd
    }
    toString() {
        return new Date(this.CooldownEnd).toGermanTimeString();
    }
}  

Cooldown.prototype.toJSON = function(obj) {
    return {CooldownEnd: this.cooldown};
}
Cooldown.fromJSON = function(obj) {
    var instance = new Cooldown(obj);
    return instance;
}

module.exports.Cooldown = Cooldown;