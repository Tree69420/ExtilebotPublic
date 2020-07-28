module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (args.length == 0){
        args = '';
    }
    var reason = '';
    var hypeVal;
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val() != null){
            hypeVal = snap.val().hype;
        }
    }).then(() => {
        if (args.length >= 1){
            reason = ' for ' + args.join(' ');
        }
        firebase.database().ref(message.guild.id).update({
            hype: hypeVal + 1
        }).then(() => {
            message.channel.send(hypeVal + 1 + ' hype' + reason);
        });
    });
    
    
}

module.exports.help = {
    name: 'hype',
    syntax: 'hype [reason(optional)]',
    usage: 'Adds 1 to the hype',
    perms: 'none'
}