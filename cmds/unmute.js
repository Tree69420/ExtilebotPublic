module.exports.run = async (bot, message, args, firebase, prefix) => {
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
    var reason = 'no reason';
    if (message.mentions.members.first()){
        mentionId = message.mentions.members.first().id;
    }
    if (!mentionId && parseInt(args[0], 10)){
        var mentionId = parseInt(args[0], 10);
    }
    if (!mentionId){
        message.channel.send('Who should I unmute?');
    }
    if (!message.guild.members.cache.get(mentionId.toString()).roles.cache.has(muterole.id)){
        message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' isn\'t muted, you bot\nTanqies, Bjarnav');
        return;
    }
    message.guild.members.cache.get(mentionId.toString()).roles.remove(muterole);
    message.channel.send('<@!' + mentionId + '> was unmuted');
}
module.exports.help = {
    name: 'unmute',
    syntax: 'unmute [target]\n[target] can be a mention or id',
    usage: 'Unmutes the target',
    perms: 'manage roles'
}