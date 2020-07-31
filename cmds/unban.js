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
        message.channel.send('Who should I unban?');
        return;
    }
    var reason = 'no reason';
    var mentionId;
    if (message.mentions.users.first()){
        mentionId = message.mentions.users.first().id;
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
    message.guild.members.unban(mentionId.toString(), reason).catch(error => {
        message.channel.send('This user isn\'t banned');
        return;
    }).then(() => {
        message.channel.send('<@!' + mentionId + '> was unbanned for ' + reason);
    });
}
module.exports.help = {
    name: 'unban',
    syntax: 'unban [target] [reason(optional)]\n[target] can be a mention or an id',
    usage: 'Unbans the target',
    perms: 'ban members'
}