var token = require('../auth.json').token;
module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.member.hasPermission('ADMINISTRATOR') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    message.channel.send('Restarting...').then(() => bot.destroy()
    ).then(() => bot.login(token)
    ).then(() => bot.user.setActivity('&help | ' + bot.guilds.cache.size.toString() + ' servers', { type: 'WATCHING' })
    ).then(() => message.channel.send('Back up!')
    ).then(() => console.log('Restarted successfully'));
}
module.exports.help = {
    name: 'restart',
    syntax: 'restart',
    usage: 'Restarts the bot',
    perms: 'administrator'
}