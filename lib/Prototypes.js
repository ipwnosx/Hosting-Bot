const djs = require("discord.js")

Date.prototype.toGermanTimeString = function() {
    let d = this.getDate();
    d = d < 10 ? '0'+d : d;
    let m = this.getMonth()+1;
    m = m < 10 ? '0'+m : m;
    let y = this.getFullYear().toString().substring(2,4);
    let H = this.getHours();
    H = H < 10 ? '0'+H : H;
    let M = this.getMinutes();
    M = M < 10 ? '0'+M : M;
    let S = this.getSeconds();
    S = S < 10 ? '0'+S : S;
    return d+'.'+m+'.'+y+' '+H+':'+M+':'+S;
}

Date.prototype.FormatAMPM = function(date) {
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

Array.prototype.shuffle = function() {
    var j, x, i;
    for (i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this[i];
        this[i] = this[j];
        this[j] = x;
    }
    return this;
}
String.prototype.ReplaceSequence = function(char, startTag, endTag){
    let match = undefined;
    let tCopy = this.toString();
    let charShifts = 0;
    for(var x  = 0; x < this.length; x++){
        let CharacterSeq = this.substring(x, x+char.length);
        console.log(`${CharacterSeq}`)
        if(CharacterSeq === char){
            if(match !== undefined){
                console.log('XOX')
                tCopy = tCopy.substr(0, (x+charShifts)) + endTag + tCopy.substr((x+charShifts)+char.length);
                match = undefined;
                charShifts += endTag.length - char.length
            }else{
                tCopy = tCopy.substr(0, x+charShifts) + startTag + tCopy.substr((x+charShifts)+char.length);
                match = x
                charShifts += startTag.length - char.length;
            }
            
        }
    }
    return tCopy;
}

exports.CreateEmbed = function(title, content = '\x200', color = "#42b0f4", fields, images, author, footer){
    var embed = new djs.RichEmbed();
    if(title !== "") embed.setTitle(title);
    if(author !== undefined && typeof(author) == "object"){
        embed.setAuthor(...author);
    }
    if(footer !== undefined && typeof(footer) == "object"){
        embed.setFooter(...footer);
    }
    if(fields !== undefined && typeof(fields) == "object"){
        fields.forEach(field => {
            if(field[0] === "" && field[1] === ""){
                embed.addBlankField();
            }else{
                embed.addField(...field);
            }
        });
    }
    embed.setColor(color);
	if(content !== "")embed.setDescription(content);
    if(images !== undefined && 'thumbnail' in images){
        embed.setThumbnail(images.thumbnail);
    }
    if(images !== undefined && 'image' in images){
        embed.setImage(images.image)
    }
    embed.setTimestamp();
    return embed;
}
exports.MakeWarning = function(text, fields = undefined, images = undefined, author = undefined, footer = undefined){
    return this.CreateEmbed("⚠ Warning", text, "#e5a52d", fields, images,author,footer);
}
exports.MakeError = function(text, fields = undefined, title = undefined, images = undefined, author = undefined, footer = undefined){
    return this.CreateEmbed(typeof title !== "undefined" ? title : "❗ Error", text, "#c1160d", fields, images,author,footer);
}

exports.MakeSuccess = function(text, fields = undefined, images = undefined, author = undefined, footer = undefined){
    return this.CreateEmbed("☑ Success", text, "#53ef2f", fields, images,author,footer);
}
// @returns MS till the provided time
exports.InterpretTimestring = function(string){
    let time_size = {
        'second': 1000,
        'seconds': 1000,
        'minute': 60*1000,
        'minutes': 60*1000,
        'hour': (60*1000)*60,
        'hours': (60*1000)*60,
        'day': ((60*1000)*60)*24,
        'days': ((60*1000)*60)*24,
        'week': (((60*1000)*60)*24)*7,
        'weeks': (((60*1000)*60)*24)*7,
        'month': (((60*1000)*60)*24)*31,
        'months': (((60*1000)*60)*24)*31,
        'year': (((60*1000)*60)*24)*365,
        'years': (((60*1000)*60)*24)*365,
        ////////////////////////////////
        'tomorrow': ((60*1000)*60)*24
    }
    let pieces = string.split(" ");
    if(!pieces[0].match(/\d+?/)){
        return undefined;
    }
    if(!(pieces[1] in time_size)){
        return undefined;
    }
    return parseInt(pieces[0]) * time_size[pieces[1]];
}

exports.clone = function (obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
exports.deepObject = function(source) {
    const result = {}
    Object.keys(source).forEach((key) => {
      const value = source[key]
      result[key] = this.deep(value)
    }, {})
    return result
}
exports.deep = function(value) {
    if (typeof value !== 'object' || value === null) {
      return value
    }
    if (Array.isArray(value)) {
      return this.deepArray(value)
    }
    return this.deepObject(value)
   }
exports.deepArray = function(collection) {
    return collection.map((value) => {
      return this.deep(value)
    })
   }