module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (args.length == 0){
        message.channel.send('Who\'s id do you want?');
        return;
    }
    if (!message.mentions.members.first()){
        message.channel.send('Who\'s id do you want?');
        return;
    }
    var mentionId = message.mentions.members.first().id;
    message.channel.send(message.mentions.members.first().displayName + '\'s id is ' + mentionId);
}
module.exports.help = {
    name: 'getid',
    syntax: 'getid [target mention]',
    usage: 'Sends the id of the target',
    perms: 'none'
}