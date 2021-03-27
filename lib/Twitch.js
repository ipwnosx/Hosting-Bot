const axios = require("axios")

module.exports = class Twitch {

    constructor(ClientID){
        this.ClientID = ClientID;
    }
    IsChannelLive(names){
        const ClientID = this.ClientID
        return new Promise((resolve, reject) => {

            axios.get(`https://api.twitch.tv/helix/streams?user_login=${names.join('&user_login=')}`, {'headers': {'Client-ID': ClientID}}).then(answer => {
                // console.log(answer);
                resolve(answer.data);

            }).catch(reject)
        })
        
    }
}
