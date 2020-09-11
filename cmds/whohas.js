const Discord = require('discord.js');
module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
	var embed = await new Discord.MessageEmbed()
        .setColor('#0099ff')
    var obj = {};
    var roleId = '';
    if (parseInt(args[0])) var roleId = await args[0];
    if (args[0].startsWith('<@&') && args[0].endsWith('>')){
        var roleId = await args[0].slice(3,-1);
        console.log(roleId);
    }
    if (!parseInt(roleId)){
        message.channel.send('Invalid role');
        return;
    }
    if (!roleId){
        return;
    }
    let role = message.guild.roles.cache.find(roles => roles.id == roleId);
    embed.setTitle('Members with role ' + role.name);
    message.guild.members.cache.forEach(async member => {
        if (member.roles.cache.has(roleId)){
            obj['<@!' + member.id + '>'] = '<@!' + member.id + '>';
        }
    });
    for (ping in obj){
        embed.addFields({name: '\u200b', value: ping});
    }
    message.channel.send(embed);
}
module.exports.help = {
    name: 'whohas',
    syntax: 'whohas',
    usage: 'Shows who has a certain role',
    perms: 'none'
}