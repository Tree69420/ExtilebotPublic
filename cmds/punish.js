module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!message.member.hasPermission('MANAGE_ROLES') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (args.length == 0){
        message.channel.send('Who should I punish?');
        return;
    }
    var mentionId;
    var punishList;
    var reason = 'no reason';
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val() != null){
            punishList = snap.val().punishedMembers;
        }
        if (message.mentions.members.first()){
            mentionId = message.mentions.members.first().id;
        }
        else if (parseInt(args[0], 10)){
            mentionId = parseInt(args[0], 10);
        }
    }).then(() => {
        if (!mentionId){
            message.channel.send('Who should I punish?');
            return;
        }
        if (!message.guild.members.cache.get(mentionId.toString())){
            message.channel.send('Who should I punish?');
            ('Wrong person')
            return;
        }
        if (punishList){
            if (punishList[mentionId]){
                message.channel.send(message.guild.members.cache.get(mentionId.toString()).displayName + ' is already punished, you bot\nTanqies, Bjarnav');
                return;
            }
        }
        if (bot.users.cache.get(mentionId.toString()).bot || mentionId == 591051639213785088 || mentionId == 633786053903515648){
            message.channel.send('You can\'t punish a bot, lawl');
            return;
        }
        if (args.length >= 2){
            reason = args.slice(1).join(' ');
        }
        firebase.database().ref(message.guild.id + '/punishedMembers').update({
            [mentionId] : mentionId
        }).then(() => {
            message.channel.send('<@!' + mentionId + '> was punished for ' + reason);
        });
    });
    
    
}

module.exports.help = {
    name: 'punish',
    syntax: 'punish [target] [reason(optional)\n[target] can be a mention or id',
    usage: 'Punishes the target, causing everything they say to be scrambled',
    perms: 'manage roles'
}