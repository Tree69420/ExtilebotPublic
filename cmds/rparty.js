const Discord = require('discord.js');
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
                delete rWL[rWL.leader]
                var embed = new Discord.MessageEmbed()
                    .setTitle('Players')
                    .setDescription('The Party')
                    .addFields(
                        { name: 'Leader', value: '<@!' + rWL.leader + '>'}
                    )
                delete rWL.leader;
                if (!Object.keys(rWL).length){
                    message.channel.send(embed);
                    return;
                }
                embed.addFields(
                    { name: 'Plebs', value: '** **', inline: true}
                )
                for (player in rWL){
                    embed.addFields(
                        { name: '** **', value: '<@!' + player + '>'}
                    )
                }
                message.channel.send(embed)
                return;
            }
            else{
                message.channel.send('Bruh there\'s no party');
                return;
            }
        }
        else{
            delete rGame.playerList[rGame.leader]
            var embed = new Discord.MessageEmbed()
                .setTitle('Players')
                .setDescription('The Party')
                .addFields(
                    { name: 'Leader', value: '<@!' + rGame.leader + '>'}
                )
            if (!Object.keys(rGame.playerList).length){
                message.channel.send(embed);
                return;
            }
            embed.addFields(
                { name: 'Plebs', value: '** **'}
            )
            for (player in rGame.playerList){
                if (rGame.playersLeft.player){
                    embed.addFields(
                        { name: '** **', value: '<@!' + player + '>(alive)'}
                    )
                }
                else{
                    embed.addFields(
                        { name: '** **', value: '<@!' + player + '>(dead)'}
                    )
                }
            }
            message.channel.send(embed)
            return;
        }
    });
}
module.exports.help = {
    name: 'rparty',
    syntax: 'rparty',
    usage: 'Shows the roulette party',
    perms: 'none'
}