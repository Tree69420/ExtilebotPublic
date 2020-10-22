module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (message.member.id != 532572460839731220){
        message.channel.send( '\'leave\' was not recognized as an internal or external command, operable program, or batch file\nUse ' + prefix + 'help to get my command list');
        return;
    }
    message.channel.send('Bye suckas!');
    message.guild.leave();
}
module.exports.help = {
    name: 'leave',
    syntax: 'why do you want to know?',
    usage: 'You can\'t even use it',
    perms: 'stop bothering me'
}