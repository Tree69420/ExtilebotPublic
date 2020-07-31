module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (args.length == 0){
        args = '';
    }
    var hypeVal;
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val() != null){
            hypeVal = snap.val().hype;
        }
    }).then(() => {
        if (!hypeVal){
            message.channel.send('The hype is already 0, you bot');
            return;
        }
        firebase.database().ref(message.guild.id).update({
            hype: 0
        }).then(() => {
            message.channel.send('The hype was reset');
        });
    });
    
    
}

module.exports.help = {
    name: 'resethype',
    syntax: 'resethype',
    usage: 'Resets the hype',
    perms: 'manage messages'
}