module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (message.member.id != 532572460839731220){
        message.channel.send( '\'msgall\' was not recognized as an internal or external command, operable program, or batch file\nUse ' + prefix + 'help to get my command list');
        return;
    }
    bot.guilds.cache.forEach(guild => {
        guild.systemChannel.send(args.join(' '));
    });
}

module.exports.help = {
    name: 'msgall',
    syntax: 'why do you want to know?',
    usage: 'You can\'t even use it',
    perms: 'stop bothering me'
}