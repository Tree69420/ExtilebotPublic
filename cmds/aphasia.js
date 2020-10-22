module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (!message.member.hasPermission('MANAGE_ROLES') && message.member.id != 532572460839731220 && message.member.id != message.guild.ownerID){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (args.length == 0){
        message.channel.send('Who should give aphasia?');
        return;
    }
    var mentionId;
    var aphasicList;
    var reason = 'no reason';
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
            message.channel.send('Who should I give aphasia?');
            return;
        }
        if (!message.guild.members.cache.get(mentionId.toString())){
            message.channel.send('Who should I give aphasia?');
            return;
        }
        if (aphasicList){
            if (aphasicList[mentionId]){
                message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' already has aphasia, you bot\nTanqies, Bjarnav');
                return;
            }
        }
        if (bot.users.cache.get(mentionId.toString()).bot || mentionId == 591051639213785088 || mentionId == 633786053903515648){
            message.channel.send('You can\'t give a bot aphasia, lawl');
            return;
        }
        if (args.length >= 2){
            reason = args.slice(1).join(' ');
        }
        firebase.database().ref(message.guild.id + '/aphasicMembers').update({
            [mentionId] : mentionId
        }).then(() => {
            message.channel.send('<@!' + mentionId + '> was inflicted with aphasia for ' + reason);
        });
    });
    
    
}

module.exports.help = {
    name: 'aphasia',
    syntax: 'aphasia [target] [reason(optional)]\n[target] can be a mention or an id',
    usage: 'Inflicts the target with aphasia, causing them to say random words',
    perms: 'manage roles'
}