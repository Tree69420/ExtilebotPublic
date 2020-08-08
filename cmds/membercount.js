module.exports.run = async (bot, message, args, firebase, prefix) => {
    message.channel.send(message.guild.memberCount);
}
module.exports.help = {
    name: 'membercount',
    syntax: 'membercount',
    usage: 'Shows the membercount for the server',
    perms: 'none'
}