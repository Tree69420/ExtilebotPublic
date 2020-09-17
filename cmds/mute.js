module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (!message.member.hasPermission('MANAGE_ROLES') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (!message.guild.me.hasPermission('MANAGE_ROLES')){
        message.channel.send('Role management perms please');
        return;
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')){
        message.channel.send('Channel management perms please');
        return;
    }
    if (args.length == 0){
        message.channel.send('Who should I mute?');
        return;
    }
    var muterole = message.guild.roles.cache.find(role => role.name == "Muted");//find muted role
    if (!muterole){
        muterole = await message.guild.roles.create({
            data: {
                name: 'Muted',
                hoist: false,
                permissions: 263232,
                mentionable: false,
            }
        })
    }
    message.guild.channels.cache.forEach(tc => {
        tc.updateOverwrite(muterole, {
            SEND_MESSAGES: false,
            SPEAK: false
        });
    });
    var reason = 'no reason';
    if (message.mentions.members.first()){
        mentionId = message.mentions.members.first().id;
    }
    if (!mentionId && parseInt(args[0], 10)){
        var mentionId = parseInt(args[0], 10);
    }
    if (!mentionId){
        message.channel.send('Who should I mute?');
    }
    if (!message.guild.members.cache.get(mentionId.toString())){
        message.channel.send('The user specified is not in the server');
        return;
    }
    if (message.guild.members.cache.get(mentionId.toString()).roles.cache.has(muterole.id)){
        message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' is already muted, you bot\nTanqies, Bjarnav');
        return;
    }
    if (message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) <= 0){
        message.channel.send('Sorry, your highest role is not higher than the target\'s highest role');
        return;
    }
    if (args.length >= 2){
        reason = args.slice(1).join(' ');
    }
    message.guild.members.cache.get(mentionId.toString()).roles.add(muterole);
    message.channel.send('<@!' + mentionId + '> was muted for ' + reason);
}
module.exports.help = {
    name: 'mute',
    syntax: 'mute [target] [reason(optional)]\n[target] can be a mention or an id',
    usage: 'Mutes the target',
    perms: 'manage roles'
}