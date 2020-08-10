module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (args.length == 0){
        message.channel.send('What should I send?');
        return;
    }
    var mentionId;
    firebase.database().ref('m' + message.member.id).once('value').then(function(snap) {
        if (snap.val() != null){
            mentionId = snap.val().target;
        }
    }).then(() => {
        if (!mentionId){
            message.channel.send('Set a target first');
        }
        bot.users.cache.get(mentionId).send('<@!' + message.member.id + '>: ' + args.join(' ')).catch(error => {
            message.channel.send('Error: target is not receiving messages\nTry a different target');
            return;
        });
        message.channel.send('Message successfully sent to ' + message.guild.members.cache.get(mentionId).displayName);
    });
}
module.exports.help = {
    name: 'send',
    syntax: 'send [message]',
    usage: 'Sends a message to the target',
    perms: 'none'
}