module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.member.hasPermission('BAN_MEMBERS') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (!message.guild.me.hasPermission('BAN_MEMBERS')){
        message.channel.send('Banning perms please');
    }
    if (args.length == 0){
        message.channel.send('Who should I unban?');
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
        message.channel.send('Who should I unban?');
        return;
    }
    if (args.length >= 2){
        reason = args.slice(1).join(' ');
    }
    message.guild.fetchBan(bot.users.cache.get(mentionId.toString())).catch(error =>{
        message.channel.send('This user isn\'t banned');
        return;
    });
    message.guild.members.unban(mentionId + '');
    message.channel.send('<@!' + mentionId + '> was unbanned for ' + reason);
}
module.exports.help = {
    name: 'unban',
    syntax: 'unban [target id] [reason(optional)]',
    usage: 'Unbans the target',
    perms: 'ban members'
}