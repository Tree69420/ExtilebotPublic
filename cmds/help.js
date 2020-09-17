const fs = require('fs');
const Discord = require('discord.js');
var cmds = {};
fs.readdir('./cmds', (err,files) => {
    if (err) {
        console.log(err);
    }
    let cmdFiles = files.filter(f => f.split('.')[1] === 'js');
    if (cmdFiles.length === 0){
        console.log('No files found');
        return;
    }
    cmdFiles.forEach((f) => {
        let props = require(`./${f}`);
        cmds[props.help.name] = {
            name: props.help.name,
            syntax: props.help.syntax,
            usage: props.help.usage,
            perms: props.help.perms
        };
    });
});
module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    var command = args[0];
    if (!command){
        var newEmbed = await new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
        .setDescription('Commands for ExtileBot')
        .addFields(
            { name: prefix + 'help mod', value: 'Moderation commands' },
            { name: prefix + 'help fun', value: 'Fun commands' },
            { name: prefix + 'help games', value: 'Games you can play'},
            { name: prefix + 'help util', value: 'Utility commands'},
            { name: prefix + 'help misc', value: 'Miscellaneous commands'},
            { name: prefix + 'help [command]', value: 'Explains a command'}
        )
        .setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
    if (!cmds) return;
    if (command == 'settings'){
        newEmbed = await new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .setDescription('Settings for Extilebot')
            .addFields(
                {name: prefix + 'banping', value: '** **'},
                {name: prefix + 'disable', value: '** **'},
                {name: prefix + 'enable', value: '** **'}
            )
            .setTimestamp()
        message.channel.send(newEmbed);
    }
    if (command == 'mod'){
		newEmbed = await new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Commands')
			.setDescription('Moderation Commands for ExtileBot')
			.addFields(
                { name: prefix + 'aphasia', value: '** **'},
                { name: prefix + 'ban', value: '** **' },
                { name: prefix + 'banphrase', value: '** **'},
                { name: prefix + 'banphrases', value: '** **'},
                { name: prefix + 'dephasia', value: '** **'},
				{ name: prefix + 'kick', value: '** **' },
                { name: prefix + 'membercount', value: '** **'},
				{ name: prefix + 'mute', value: '** **' },
				{ name: prefix + 'punish', value: '** **' },
                { name: prefix + 'purge', value: '** **' },
                { name: prefix + 'unban', value: '** **'},
                { name: prefix + 'unbanphrase', value: '** **'},
				{ name: prefix + 'unmute', value: '** **' },
                { name: prefix + 'unpunish', value: '** **' }
			)
			.setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
    if (command == 'fun'){
		newEmbed = await new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Commands')
			.setDescription('Fun Commands for ExtileBot')
			.addFields(
                { name: prefix + '8ball', value: '** **'},
                { name: prefix + 'circus', value: '** **'},
                { name: prefix + 'eightball', value: '** **'},
				{ name: prefix + 'hype', value: '** **' },
                { name: prefix + 'kenhas', value: '** **'},
                { name: prefix + 'name', value: '** **' },
                { name: prefix + 'resethype', value: '** **'},
				{ name: prefix + 'unhype', value: '** **' },
				{ name: prefix + 'unreal', value: '** **' },
                { name: prefix + 'uwuify', value: '** **' }
			)
			.setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
    if (command == 'games'){
		newEmbed = await new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Commands')
			.setDescription('Game Commands for ExtileBot')
			.addFields(
                { name: prefix + 'aimecdr', value: '** **'},
                { name: prefix + 'blackjack', value: '** **' },
                { name: prefix + 'bj', value: '** **'},
                { name: prefix + 'flip', value: '** **'},
				{ name: prefix + 'roll', value: '** **' },
				{ name: prefix + 'help roulette', value: '** **' }
			)
			.setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
    if (command == 'roulette'){
		newEmbed = await new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Commands')
			.setDescription('Roulette Commands for ExtileBot')
			.addFields(
                { name: prefix + 'endgame', value: '** **'},
                { name: prefix + 'rjoin', value: '** **'},
                { name: prefix + 'rleave', value: '** **' },
                { name: prefix + 'rparty', value: '** **'},
                { name: prefix + 'rstart', value: '** **'},
                { name: prefix + 'shoot', value: '** **'}
			)
			.setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
    if (command == 'util'){
		newEmbed = await new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Commands')
			.setDescription('Utility Commands for ExtileBot')
			.addFields(
                { name: prefix + 'help', value: '** **'},
				{ name: prefix + 'ping', value: '** **' },
                { name: prefix + 'prefix', value: '** **'},
				{ name: prefix + 'restart', value: '** **' },
                { name: prefix + 'support', value: '** **' },
                { name: prefix + 'invite', value: '** **'}
			)
			.setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
    if (command == 'misc'){
		newEmbed = await new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Commands')
			.setDescription('Miscellaneous Commands for ExtileBot')
			.addFields(
				{ name: prefix + 'avatar', value: '** **' },
                { name: prefix + 'banner', value: '** **' },
                { name: prefix + 'getid', value: '** **'},
				{ name: prefix + 'send', value: '** **' },
                { name: prefix + 'settarget', value: '** **'}
			)
			.setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
    if (cmds[command]){
        var newEmbed = await new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
        .setDescription('The ' + cmds[command].name + ' command')
        .addFields(
            { name: 'Syntax', value: '\`\`' + prefix + cmds[command].syntax + '\`\`'},
            { name: 'Effect', value: cmds[command].usage},
            { name: 'Permissions needed', value: cmds[command].perms},
        )
        .setTimestamp()
        message.channel.send(newEmbed);
        return;
    }
}
module.exports.help = {
    name: 'help',
    syntax: 'help',
    usage: 'Helps with commands',
    perms: 'none'
}