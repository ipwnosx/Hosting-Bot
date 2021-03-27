const Node = require('nodeactyl');
const paypal = require("paypal-rest-sdk")
paypal.configure({
    'mode': 'sandbox', //live or sandbox
    'client_id': 'CLIENTID',
    'client_secret': 'CLIENTSECRET'
})

module.exports = {
    aliases: ['purchase', 'buy', 'configure'],
    Execute: function(message, user, channel, arguments, context, discord) {
        
        channel.send(context.HelperLibrary.CreateEmbed('💻 Server configurator', `Hey <@${user.id}>! do you want a premium or basic? (Respond with \`premium\` or \`basic\`)`)).then(_ => {
            channel.awaitMessages(((msg) => msg.author.id === user.id), {max:1,time:60000}).then(response => {
                if(response.first()){
                    let isPremium = response.first().content.toLowerCase() == 'premium';
                    channel.send(context.HelperLibrary.CreateEmbed('💻 Server configurator', `You selected the \`${isPremium ? 'premium' : 'basic'}\` package, how much RAM do you want (1-8 GB)?`)).then(_ => {
                        channel.awaitMessages(((msg) => msg.author.id === user.id), {max:1,time:60000}).then(response => {
                            if(response.first()){
                                let GB = parseInt(response.first().content)
                                if(GB > 8) GB = 8;
                                var create_payment_json = {
                                    "intent": "sale",
                                    "payer": {
                                        "payment_method": "paypal"
                                    },
                                    "redirect_urls": {
                                        "return_url": "https://mcmarket.org",
                                        "cancel_url": "https://mcmarket.org"
                                    },
                                    "transactions": [{
                                        "item_list": {
                                            "items": [{
                                                "name": `${GB} ${isPremium ? 'Premium' : 'Basic'} minecraft server`,
                                                "sku": "item",
                                                "price": `${isPremium ? GB * 1.5 : GB * 1.25}`,
                                                "currency": "USD",
                                                "quantity": 1
                                            }]
                                        },
                                        "amount": {
                                            "currency": "USD",
                                            "total": `${isPremium ? GB * 1.5 : GB * 1.25}`
                                        },
                                        "description": `This payment was created via the ${message.guild.name} discord payment bot.`
                                    }]
                                };
                                paypal.payment.create(create_payment_json, (error, payment) => {
                                    if(error){
                                        console.error(error)
                                    }else{
                                        let payment_url = payment.links.filter(link => link.rel == "approval_url");
                                        channel.send(context.HelperLibrary.CreateEmbed('💻 Server configurator', `Hey <@${user.id}>! Thank you very much, here is the payment url ${payment_url[0].href}`))
                                    }
                                })

                            }
                        });

                    })
                }
            })
        })
    }
}