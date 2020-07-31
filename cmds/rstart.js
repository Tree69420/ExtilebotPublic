const Discord = require('discord.js');
function arrShuffle(arr){
	var n = arr.length;
	for(var i = 0 ; i<n-1 ; ++i) {
		var j = Math.floor(Math.random() * n);
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}//array scrambling 
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
        if (!rWL){
            message.channel.send('Confused ghost noises');
            return;
        }
        if (rWL.leader != message.author.id && !message.member.hasPermission('ADMINISTRATOR')){
            message.channel.send('Boi, ur not the party leader or admin');
            return;
        }
        if (Object.keys(rWL).length <= 2){
            message.channel.send('Roulette isn\'t a solo game. Go get some friends');
            return;
        }
        if (rGame){
            message.channel.send('There\'s already a game going!');
            return;
        }
        rGame = {leader: rWL.leader};
        delete rWL.leader;
        rGame.playerList = rWL;
        rGame.playersLeft = rWL;
        rGame.order = arrShuffle(Object.keys(rWL));
        rGame.curIndex = 0;
        var string = ''
        for (player in rWL){
            string = string + '<@!' + player + '> ';
        }
        message.channel.send(string + ', we are starting!');
        message.channel.send('<@!' + rGame.order[0] + '>, it\'s your turn first\nTake a shot with ' + prefix + 'shoot');
        firebase.database().ref(message.guild.id).update({
            rouletteWL : {}
        });
        firebase.database().ref(message.guild.id).update({
            rouletteGame: rGame
        });
    });
}
module.exports.help = {
    name: 'rstart',
    syntax: 'rstart',
    usage: 'Starts a game of roulette',
    perms: 'party leader or admin'
}