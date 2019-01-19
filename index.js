const Discord = require('discord.js');
const auth = require('./auth.json');
const client = new Discord.Client({
    commandPrefix: auth.prefix,
    autorun: true
});

console.log(auth.token)

client.login(auth.token);

client.on('message', msg => {

    let prefix = '!suggest ';
    let message = msg.content.toLowerCase();


    if (msg.author.bot) {
        return;
    } else if (msg.channel.id != "suggestion channel id") {
        return;
    } else {
        msg.delete();
        console.log(message.startsWith(prefix))
        if (message.startsWith(prefix) != true) {
            return;
        } else {
            message = message.replace('!suggest ', '');
            msg.reply('Suggestion ' + message + ' has been submitted! Check <voting channel tag> to vote')
            client.channels.get('voting channel id').send('New Suggestion: ' + message)
                .then(function (message) {
                    message.react('✅');
                    message.react('❌');
                })
        }
    }

});
