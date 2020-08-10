module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
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
            if (rWL){
                if (rWL[message.author.id]){
                    message.channel.send('Bruh you\'re already in the party');
                    return;
                }
                else{
                    firebase.database().ref(message.guild.id + '/rouletteWL').update({
                        [message.author.id] : message.author.id
                    });
                    message.channel.send('You joined the party');
                    return;
                }
            }
            else{
                firebase.database().ref(message.guild.id).update({
                    rouletteWL : {
                        [message.author.id] : message.author.id,
                        leader : message.author.id
                    }
                });
                message.channel.send('You joined the party\n<@!' + message.author.id + '> is now the party leader');
                return;
            }
        }
        else{
            if (rWL){
                if (rWL[message.author.id]){
                    message.channel.send('Bruh you\'re already on the waitlist');
                    return;
                }
                if (rWL.playerList[message.author.id]){
                    message.channel.send('You\'re already in a game');
                    return;
                }
                else{
                    firebase.database().ref(message.guild.id + '/rouletteWL').update({
                        [message.author.id] : message.author.id
                    });
                    message.channel.send('There\'s a game right now, but you were put on the waitlist for the next game');
                    return;
                }
            }
            else{
                firebase.database().ref(message.guild.id).update({
                    rouletteWL : {
                        [message.author.id] : message.author.id
                    }
                });
                message.channel.send('There\'s a game right now, but you were put on the waitlist for the next game');
                return;
            }
        }
    });
}
module.exports.help = {
    name: 'rjoin',
    syntax: 'rjoin',
    usage: 'Joins the roulette party or waiting list',
    perms: 'none'
}