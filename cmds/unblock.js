module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (args.length == 0){
        firebase.database().ref('m' + message.member.id).set({
            target: false
        });
        message.channel.send('Successfully unblocked all messages');
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
            blockall: false
        });
        message.channel.send('Successfully unblocked all messages');
        return;
    }
    firebase.database().ref('m' + message.member.id).update({
        mentionId: null
    });
    message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' was unblocked');
}
module.exports.help = {
    name: 'unblock',
    syntax: 'unblock [target(optional)]\n[target] can be a mention or an id, if no target then unblocks all',
    usage: 'Unblocks all messages sent from the target',
    perms: 'none'
}