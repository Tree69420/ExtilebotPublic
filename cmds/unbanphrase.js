module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (args.length == 0){
        message.channel.send('What phrase do you want to unban?');
        return;
    }
    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.member.id != 532572460839731220 && message.member.id != message.guild.ownerID){
        message.channel.send('Insufficient permissions');
        return;
    }
    var phrases;
    var bphrase = await args.join(' ');
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val().bphrases){
            phrases = snap.val().bphrases;
        }
    }).then(() => {
        if (!phrases){
            message.channel.send('There are no banphrases yet');
            return;
        }
        if (!phrases[bphrase]){
            message.channel.send('The phrase ' + bphrase + ' is not banned');
            return;
        }
        firebase.database().ref(message.guild.id + '/bphrases').update({
            [bphrase]: null
        });
        message.channel.send('The phrase ' + bphrase + ' was unbanned');
        
    });
} 

module.exports.help = {
    name: 'unbanphrase',
    syntax: 'unbanphrase [phrase]',
    usage: 'Undoes the effects of banphrase',
    perms: 'manage messages'
}