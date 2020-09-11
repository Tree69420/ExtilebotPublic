module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (message.author.id != 532572460839731220) return;
    bot.guilds.cache.forEach(guild => {
        guild.systemChannel.send(args.join(' '));
    });
}

module.exports.help = {
    name: 'msgall'
}