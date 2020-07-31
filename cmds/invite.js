module.exports.run = async (bot, message, args, firebase, prefix) => {
    message.channel.send('https://discord.com/oauth2/authorize?client_id=' + bot.user.id + '&permissions=8&scope=bot');
}
module.exports.help = {
    name: 'invite',
    syntax: 'invite',
    usage: 'Sends the invite link for ExtileBot',
    perms: 'none'
}