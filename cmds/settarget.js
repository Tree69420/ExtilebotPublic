module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (args.length == 0){
        message.channel.send('Who should I set the target to?');
        return;
    }
    var mentionId;
    if (message.mentions.members.first()){
        mentionId = message.mentions.members.first().id;
    }
    if (!mentionId && parseInt(args[0], 10)){
        mentionId = parseInt(args[0], 10);
    }
    if (!mentionId){
        message.channel.send('Who should I set the target to?');
        return;
    }
    if (!message.guild.members.cache.get(mentionId.toString())){
        message.channel.send('The user is not in the server');
        return;
    }
    firebase.database().ref('m' + message.member.id).update({
        target: mentionId
    });
    message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' was set as your target');
}
module.exports.help = {
    name: 'settarget',
    syntax: 'settarget [target]\n[target] can be a mention or an id',
    usage: 'Sets your target to the target',
    perms: 'none'
}