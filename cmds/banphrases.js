const Discord = require('discord.js');
module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    var bphrases;
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val() != null){
            bphrases = snap.val().bphrases;
        }
    }).then(() => {
        if (!bphrases){
            message.channel.send('There are no banned phrases');
            return;
        }
        var embed = new Discord.MessageEmbed()
            .setTitle('Banned Phrases')
        for (phrase in bphrases){
            embed.addFields({name: phrase + ': ' + bphrases[phrase], value: '\u200b'});   
        }
        message.channel.send(embed);
    });
}
module.exports.help = {
    name: 'banphrases',
    syntax: 'banphrases',
    usage: 'Shows the banned phrases',
    perms: 'none'
}