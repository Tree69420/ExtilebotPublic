module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    message.channel.send('The member count for ' + message.guild.name + ' is ' + message.guild.memberCount);
}
module.exports.help = {
    name: 'membercount',
    syntax: 'membercount',
    usage: 'Shows the membercount for the server',
    perms: 'none'
}