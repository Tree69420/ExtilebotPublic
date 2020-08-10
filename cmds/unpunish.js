module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (!message.member.hasPermission('MANAGE_ROLES') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (args.length == 0){
        message.channel.send('Who should I unpunish?');
        return;
    }
    var mentionId;
    var punishList;
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val() != null){
            punishList = snap.val().punishedMembers;
        }
        if (message.mentions.members.first()){
            mentionId = message.mentions.members.first().id;
        }
        if (!mentionId && parseInt(args[0], 10)){
            mentionId = parseInt(args[0], 10);
        }
    }).then(() => {
        if (!mentionId){
            message.channel.send('Who should I unpunish?');
            return;
        }
        if (!punishList){
            message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' isn\'t punished, you bot\nTanqies, Bjarnav');
            return;
        }
        if (!punishList[mentionId]){
            message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' isn\'t punished, you bot\nTanqies, Bjarnav');
            return;
        }
        firebase.database().ref(message.guild.id + '/punishedMembers').update({
            [mentionId] : null
        }).then(() => {
            message.channel.send('<@!' + mentionId + '> was unpunished');
        });
    });
    
    
}
module.exports.help = {
    name: 'unpunish',
    syntax: 'upunish [target]\n[target] can be a mention or id',
    usage: 'Unpunishes the target',
    perms: 'manage roles'
}