const Discord = require('discord.js');
module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (!message.member.hasPermission('ADMINISTRATOR')){
        message.channel.send('You\'re not an admin, bruh');
        return;
    }
    var rWL;
    var rGame;
    firebase.database().ref(message.guild.id).once('value').then(function(snap) {
        if (snap.val() != null){
            if (snap.val().rouletteGame){
                rGame = snap.val().rouletteGame;
            }
            if (snap.val().rouletteWL){
                rWL = snap.val().rouletteWL;
            }
        }
    }).then(() => {
        if (!rGame){
            message.channel.send('There\'s no game to end');
            return;
        }
        message.channel.send('Are you sure you want to end this game? Respond with yes or no');
        const filter = response => {
            var resp = response.content.toLowerCase();
            if (response.author.id == message.author.id && (resp == 'y' || resp == 'n' || resp == 'yes' || resp == 'no')) {
                return true;
            }
            else {
                return false;
            }
        }
        message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(function(collected) {
            var resp = collected.first().content.toLowerCase;
            if (resp == 'n' || resp == 'no'){
                message.channel.send('The game was not ended');
                return;
            }
            message.channel.send('The game was ended');
            firebase.database().ref(message.guild.id).update({
                rouletteGame: {}
            });
            firebase.database().ref(message.guild.id + '/rouletteWL').update({
                leader: rGame.leader
            });
            for (player in rGame.playerList){
                firebase.database().ref(message.guild.id + '/rouletteWL').update({
                    [player]: player
                });
            }
        });
    });
}
module.exports.help = {
    name: 'endgame',
    syntax: 'endgame',
    usage: 'Ends the roulette game',
    perms: 'administrator'
}