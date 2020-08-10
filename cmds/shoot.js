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
            message.channel.send('There isn\'t even a game going');
            return;
        }
        if (!rGame.playerList[message.author.id]){
            message.channel.send('You\'re not in the game');
            return;
        }
        if (!rGame.playersLeft[message.author.id]){
            message.channel.send('You\'re already dead');
            return;
        }
        if (rGame.order[rGame.curIndex] != message.author.id){
            message.channel.send('Have some patience and wait your turn');
            return;
        }
        var randInt = Math.floor(Math.random()*rGame.order.length);
        if (randInt){
            rGame.curIndex = rGame.curIndex + 1;
            if (rGame.curIndex >= Object.keys(rGame.playersLeft).length){
                firebase.database().ref(message.guild.id + '/rouletteGame').update({
                    curIndex: 0
                })
                rGame.curIndex = 0;
            }
            message.channel.send('You survived!\n<@!' + rGame.order[rGame.curIndex] + '>, take a shot with ' + prefix + 'shoot');
            firebase.database().ref(message.guild.id + '/rouletteGame').update({
                curIndex: rGame.curIndex
            });
            return;
        }
        if (rGame.order.length > 2){
            if (rGame.curIndex >= Object.keys(rGame.playersLeft).length){
                firebase.database().ref(message.guild.id + '/rouletteGame').update({
                    curIndex: 0
                });
                rGame.curIndex = 0;
            }
            rGame.order.splice(rGame.curIndex, 1);
            delete rGame.playersLeft[message.author.id];
            if (rGame.curIndex >= Object.keys(rGame.playersLeft).length){
                firebase.database().ref(message.guild.id + '/rouletteGame').update({
                    curIndex: 0
                });
                rGame.curIndex = 0;
            }
            message.channel.send(':boom:BANG!:boom: You died!\n<@!' + rGame.order[rGame.curIndex] + '>, take a shot with ' + prefix + 'shoot');
            firebase.database().ref(message.guild.id + '/rouletteGame').update({
                order: rGame.order,
                playersLeft: rGame.playersLeft
            });
            return;
        }
        rGame.order.splice(rGame.curIndex, 1);
        message.channel.send(':boom:BANG!:boom: You died!\n:trophy:<@!' + rGame.order[0] + '> is the winner!:trophy:');
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
}
module.exports.help = {
    name: 'shoot',
    syntax: 'shoot',
    usage: 'Takes a turn in roulette',
    perms: 'none'
}