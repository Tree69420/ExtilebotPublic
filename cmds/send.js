module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (args.length == 0){
        message.channel.send('What should I send?');
        return;
    }
    var mentionId;
    var breakk = false;
    firebase.database().ref().once('value').then(function(snap) {
        if (snap.val()['m' + message.author.id] != null){
            mentionId = snap.val()['m' + message.author.id].target;
        }
        if (mentionId){
            if (snap.val()['m' + mentionId]){
                if (snap.val()['m' + mentionId][message.author.id] || snap.val()['m' + mentionId].blockall){
                    message.channel.send('The target has blocked you\nTry a different target');
                    breakk = true;
                }
            }
        }
    }).then(() => {
        if (breakk) return;
        if (!mentionId){
            message.channel.send('Set a target first');
            return;
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