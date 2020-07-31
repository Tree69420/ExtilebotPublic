module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.member.hasPermission('BAN_MEMBERS') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (!message.guild.me.hasPermission('BAN_MEMBERS')){
        message.channel.send('Banning perms please');
        return;
    }
    if (args.length == 0){
        message.channel.send('Who should I ban?');
        return;
    }
    var reason = 'no reason';
    var mentionId;
    if (message.mentions.members.first()){
        mentionId = message.mentions.members.first().id;
    }
    if (!mentionId && parseInt(args[0], 10)){
        mentionId = parseInt(args[0], 10);
    }
    if (!mentionId){
        message.channel.send('Who should I ban?');
        return;
    }
    if (!message.guild.members.cache.get(mentionId.toString())){
        message.channel.send('Who should I ban?');
        return;
    }
    if (!message.guild.members.cache.get(mentionId.toString()).bannable){
        message.channel.send('It seems that I am unable to ban ' + message.guild.members.cache.get(mentionId.toString()).displayName + ', more power please');
        return;
    }
    if (args.length >= 2){
        reason = args.slice(1).join(' ');
    }
    message.guild.members.ban(mentionId.toString());
    message.channel.send('<@!' + mentionId + '> was banned for ' + reason);
}
module.exports.help = {
    name: 'ban',
    syntax: 'ban [target] [reason(optional)]\n[target] can be a mention or an id',
    usage: 'Bans the target',
    perms: 'ban members'
}