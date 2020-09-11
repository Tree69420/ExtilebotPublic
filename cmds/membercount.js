module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    var botcount = 0;
    var nonbotcount = 0;
	message.guild.members.cache.forEach(member => {
		if (member.user.bot){
			botcount++;
		}
		else{
			nonbotcount++;
		}
	});
    message.channel.send('The member count for ' + message.guild.name + ' is ' + message.guild.memberCount + ', with ' + botcount + ' bots and ' + nonbotcount + ' non-bots');
}
module.exports.help = {
    name: 'membercount',
    syntax: 'membercount',
    usage: 'Shows the membercount for the server',
    perms: 'none'
}