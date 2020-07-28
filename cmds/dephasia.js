module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.member.hasPermission('MANAGE_ROLES') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (args.length == 0){
        message.channel.send('Who should I remove of aphasia?');
        return;
    }
    var mentionId;
    var aphasicList;
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val() != null){
            aphasicList = snap.val().aphasicMembers;
        }
        if (message.mentions.members.first()){
            mentionId = message.mentions.members.first().id;
        }
        if (!mentionId && parseInt(args[0], 10)){
            mentionId = parseInt(args[0], 10);
        }
    }).then(() => {
        if (!mentionId){
            message.channel.send('Who should I remove of aphasia?');
            return;
        }
        if (!aphasicList){
            message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' doesn\'t have aphasia, you bot\nTanqies, Bjarnav');
            return;
        }
        if (!aphasicList[mentionId]){
            message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' doesn\'t have aphasia, you bot\nTanqies, Bjarnav');
            return;
        }
        firebase.database().ref(message.guild.id + '/aphasicMembers').update({
            [mentionId] : null
        }).then(() => {
            message.channel.send('<@!' + mentionId + '> was removed of aphasia');
        });
    });
    
    
}
module.exports.help = {
    name: 'dephasia',
    syntax: 'dephasia [target]\n[target] can be a mention or an id',
    usage: 'Takes away aphasia from the target',
    perms: 'manage roles'
}