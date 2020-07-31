module.exports.run = async (bot, message, args, firebase, prefix) => {
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
                if (!rWL[message.author.id]){
                    message.channel.send('Bruh you\'re not in the party');
                    return;
                }
                else{
                    firebase.database().ref(message.guild.id + '/rouletteWL').update({
                        [message.author.id] : null
                    }).then(() => {
                        if (rWL.leader != message.author.id){
                            message.channel.send('You left the party');
                            return;
                        }
                        delete rWL.leader;
                        delete rWL[message.author.id];
                        const o = Object.keys(rWL);
                        if (!o.length){
                            firebase.database().ref(message.guild.id).update({
                                rouletteWL : null
                            });
                            message.channel.send('You left the party\nThe party was disbanded');
                            return;
                        }
                        if (rWL){
                            var lawl = o[Math.floor(Math.random()*o.length)];
                            firebase.database().ref(message.guild.id + '/rouletteWL').update({
                                leader : lawl
                            });
                            message.channel.send('You left the party\nThe new leader is <@!' + lawl + '>');
                        }
                        return;
                    });
                }
            }
            else{
                message.channel.send('Bruh there\'s no party to leave from');
                return;
            }
        }
        else{
            if (rWL){
                if (!rWL[message.author.id]){
                    message.channel.send('Bruh you\'re not on the waitlist');
                    return;
                }
                else{
                    firebase.database().ref(message.guild.id + '/rouletteWL').update({
                        [message.author.id] : null
                    });
                    message.channel.send('You left the waitlist for the next game');
                    return;
                }
            }
            else{
                message.channel.send('Bruh you\'re not on the waitlist');
                return;
            }
        }
    });
}
module.exports.help = {
    name: 'rleave',
    syntax: 'rleave',
    usage: 'Leaves the roulette party or waiting list',
    perms: 'none'
}