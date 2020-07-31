module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.guild.iconURL('png', true, 128)){
        message.channel.send('There is no banner');
        return;
    }
    message.channel.send(message.guild.iconURL('png', true, 128));
}
module.exports.help = {
    name: 'banner',
    syntax: 'banner',
    usage: 'Sends the banner of the current guild',
    perms: 'none'
}