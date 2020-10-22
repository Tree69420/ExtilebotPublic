module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (args.length == 0){
        firebase.database().ref('m' + message.member.id).update({
            blockall: true
        });
        message.channel.send('Successfully blocked all messages');
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
        firebase.database().ref('m' + message.member.id).update({
            blockall: true
        });
        message.channel.send('Successfully blocked all messages');
        return;
    }
    firebase.database().ref('m' + message.member.id).update({
        [mentionId]: mentionId
    });
    message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' was blocked');
}
module.exports.help = {
    name: 'block',
    syntax: 'block [target(optional)]\n[target] can be a mention or an id, if no target then blocks all',
    usage: 'Blocks all messages sent from the target',
    perms: 'none'
}