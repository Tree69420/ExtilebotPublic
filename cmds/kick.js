module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.member.hasPermission('KICK_MEMBERS') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (!message.guild.me.hasPermission('KICK_MEMBERS')){
        message.channel.send('Kicking perms please');
        return;
    }
    if (args.length == 0){
        message.channel.send('Who should I kick?');
        return;
    }
    var reason = 'no reason';
    if (message.mentions.members.first()){
        mentionId = message.mentions.members.first().id;
    }
    if (!mentionId && parseInt(args[0], 10)){
        mentionId = parseInt(args[0], 10);
    }
    if (!mentionId){
        message.channel.send('Who should I kick?');
    }
    if (!message.guild.members.cache.get(mentionId.toString()).kickable){
        message.channel.send('It seems that I am unable to kick ' + message.guild.members.cache.get(mentionId.toString()).displayName + ', more power please');
        return;
    }
    if (args.length >= 2){
        reason = args.slice(1).join(' ');
    }
    message.guild.members.cache.get(mentionId.toString()).kick();
    message.channel.send('<@!' + mentionId + '> was kicked for ' + reason);
}
module.exports.help = {
    name: 'kick',
    syntax: 'kick [target] [reason(optional)]\n[target] can be a mention or an id',
    usage: 'Kicks the target',
    perms: 'kick members'
}