module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')){
        message.channel.send('Message deletion perms please');
    }
    var deleteNo;
    if (parseInt(args[0], 10).toString()){
        deleteNo = parseInt(args[0], 10);
    }
    if (deleteNo == 0){
        message.channel.send('You can\'t delete 0 messages!');
        return;
    }
    if (deleteNo < 0){
        message.channel.send('You can\'t delete a negative number of messages!');
        return;
    }
    if (!deleteNo){
        message.channel.send('How many messages should I delete?');
        return;
    }
    if (args.length == 0){
        message.channel.send('How many messages should I delete?');
        return;
    }
    if (args.length >= 2){
        reason = args.slice(1).join(' ');
    }
    message.delete();
    message.channel.bulkDelete(deleteNo);
    message.channel.send('<@!' + message.author.id + '> deleted ' + deleteNo + ' messages');
}
module.exports.help = {
    name: 'purge',
    syntax: 'purge [amount]',
    usage: 'Deletes the specified amount of messages, or 1 if not specified',
    perms: 'manage messages'
}