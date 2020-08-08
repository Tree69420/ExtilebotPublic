const Discord = require('discord.js');
const fs = require('fs');
require('dotenv/config');

// initialize our bot
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

//settings
let prefix;
const owner = process.env.OWNER;
const token = process.env.TOKEN;

//initialize firebase
const firebase = require('firebase');
const wordList = require('./node_modules/word-list-json/words.json').words;

function scramble(s) {
	var arr = s.split('');
	var n = arr.length;
	
	for(var i = 0 ; i<n-1 ; ++i) {
		var j = Math.floor(Math.random() * n);
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	s = arr.join('');
	return s;
}//for punish scrambling
function aphasia(s) {
	var output = ''
	for (var n = 0; n < s.trim().split(' ').length; n++) {
		let number = Math.floor(Math.random() * wordList.length);
		output = output + wordList[number] + ' '
	}
	return output;
}//aphasia thingy
function eee(s){
	var arr = s.split('');
	var n = arr.length;
	var e = true;
	for (var i = 0; i < n; i++){
		if (arr[i] != 'e'){
			e = false;
		}
	}
	return e;
}//eee test
var config = {
    apiKey: "AIzaSyCF8MfWZcvprGTr3egGrPxE1TwdnUD71hA",
    authDomain: "extilebot.firebaseapp.com",
    databaseURL: "https://extilebot.firebaseio.com",
    projectId: "extilebot",
    storageBucket: "extilebot.appspot.com",
    messagingSenderId: "638492185735",
    appId: "1:638492185735:web:2d99b99948fdfa1abe1422",
    measurementId: "G-GTGD4B5T7T"
};
firebase.initializeApp(config);
//read commands files
fs.readdir('./cmds', (err,files) => {
    if (err) {
        console.log(err);
    }
    let cmdFiles = files.filter(f => f.split('.').pop() === 'js');
    if (cmdFiles.length === 0){
        console.log('No files found');
        return;
    }
    cmdFiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    })
})


bot.on('ready', async () => {
	console.log('Hello, I\'m ready');
	bot.user.setActivity('&help | ' + bot.guilds.cache.size.toString() + ' servers', { type: 'WATCHING' });
});
bot.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.content == 'Pinging...') {

        var oldMessageTimestamp = oldMessage.createdTimestamp;
        var newMessageTimestamp = newMessage.editedTimestamp;

        newMessage.edit(`Pong! \`\`${Math.floor(newMessageTimestamp - oldMessageTimestamp)}ms\`\``);
    }
});//ping command
bot.on('message', async message => {
	if (message.author.bot) return;
	if (true){
		if (eee(message.content) == true && message.content.length >= 5){
			message.channel.send('https://tenor.com/view/ea-sports-e-ea-meme-gif-14922519');
			return;
		}//eee response
		if ((message.content == 'henlo' || message.content == 'Henlo')){
			message.channel.send('Henlo, <@!' + message.author.id + '>');
			return;
		}//henlo response
		if ((message.content == 'lawl' || message.content == 'Lawl')){
			message.channel.send('Lawl');
			return;
		}//lawl response
		if (!pingus && (message.content.split(' ')[0].toLowerCase() == 'im' || message.content.split(' ')[0].toLowerCase() == 'i\'m' || message.content.split(' ')[0].toLowerCase() == 'i’m' || message.content.split(' ')[0].toLowerCase() == 'i‘m')){
			if (!message.content.split(' ').slice(1).join(' ')){
				return;
			}
			message.channel.send('Hi ' + message.content.split(' ').slice(1).join(' ') + ', I\'m Extile');
			return;
		}//dad jokes
		if (!pingus && message.content.toLowerCase().startsWith('i am')){
			if (!message.content.split(' ').slice(2).join(' ')){
				return;
			}
			message.channel.send('Hi ' + message.content.split(' ').slice(2).join(' ') + ', I\'m Extile');
			return;
		}//dad jokes
		if (!pingus && message.content.toLowerCase().substring(0,18) == 'alexa, simon says '){
			message.delete();
			message.channel.send(message.content.split(' ').slice(3).join(' '));
			return;
		}//repeat after me
	}//autoresponses
	if (message.channel.type === 'dm') return;
	var punished = false;
	var aphasic = false;
	var obsessed = false;
	var prefix = '&';
	var pingus = false;
	firebase.database().ref(message.guild.id).once('value').then(function (snap) {
		if (message.content.toLowerCase().includes('biswadev')) obsessed = true;
		if (snap.val()){
			prefix = snap.val().prefix;
			if (snap.val().punishedMembers){
				if (snap.val().punishedMembers[message.author.id]){
					punished = true;
				}
			}
			if (snap.val().aphasicMembers){
				if (snap.val().aphasicMembers[message.author.id]){
					aphasic = true;
				}
			}
		}
	}).then(() => {
		if (obsessed){
			firebase.database().ref(message.guild.id + '/punishedMembers').update({
				[message.author.id] : message.author.id
			}).then(() => {
				message.delete();
				message.channel.send('<@!' + message.author.id + '>, Obsessed!');
				message.channel.send('<@!' + message.author.id + '> was punished for obsession');
				return;
			});
		}
		let message_array = message.content.split(' ');
		let command = message_array[0];
		let args = message_array.slice(1);
		if (!prefix) return;
		if (punished){
			message.delete().catch(error => {
				message.channel.send('Give message deletion perms please');
			});
			if (message.content.includes('$') || message.content.includes(',tex') || message.content.includes('~tex')) {
				message.channel.send(`${message.author}: ${scramble(message.content)}`).then(function() {
					const filter = response => {
						if (response.author.id == 419356082981568522 || response.author.id == 510789298321096704) {
							return true;
						}
						else {
							return false;
						}
					}
					message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(function(collected) {
						collected.first().delete();
					})
				})
			} else {
				message.channel.send(`${message.author}: ${scramble(message.content)}`);
			}
		}//punished scrambling
		if (aphasic){
			if (!punished){
				message.delete().catch(error => {
					message.channel.send('Give message deletion perms please');
				});
			}
			if (message.content.includes('$') || message.content.includes(',tex') || message.content.includes('~tex')) {
				message.channel.send(`${message.author}: ${aphasia(message.content)}`).then(function() {
					const filter = response => {
						if (response.author.id == 419356082981568522 || response.author.id == 510789298321096704) {
							return true;
						} else {
							return false;
						}
					}
					message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(function(collected) {
						collected.first().delete();
					})
				})
			} else {
				message.channel.send(`${message.author}: ${aphasia(message.content)}`);
			}
		}//aphasic randomwordsing
		if (!command.startsWith(prefix)) return;
		if (bot.commands.get(command.slice(prefix.length))){
			let cmd = bot.commands.get(command.slice(prefix.length));
			if (cmd){
				console.log(message.author.username + ' ran the ' + command + ' command');
				cmd.run(bot, message, args, firebase, prefix);
				return;
			}
			message.channel.send('\'' + message.content + '\'is not recognized as an internal or external command, operable program, or batch file\nUse ' + prefix + 'help to get my command list');
		}
	});
});
bot.on('guildCreate', async gData => {
	firebase.database().ref(gData.id).update({
		'guildName': gData.name,
		'guildOwner': gData.owner.user.username,
		'guildOwnerId': gData.owner.id,
		'guildMembercount': gData.memberCount,
		'prefix': '&',
		'punishedMembers' : {},
		'aphasicMembers' : {},
		'rouletteWL' : {},
		'rouletteGame' : {},//{leader: leaderid, playerList: {set of the things}, order: [set], curIndex: 0, playersLeft: {set of ids}}
		'hype': 0
	});
	bot.user.setActivity('&help | ' + bot.guilds.cache.size.toString() + ' servers', { type: 'WATCHING' });
});
bot.on('guildMemberAdd', async gMember => {
	firebase.database().ref(gMember.guild.id).update({
		'guildMembercount': gMember.guild.memberCount,
	});
	var wcChnl = gMember.guild.systemChannel;
	if (!wcChnl) return;
	wcChnl.send('Welcome <@!' + gMember.id + '> to the server!');
});
bot.on('guildMemberRemove', async gMember => {
	firebase.database().ref(gMember.guild.id).update({
		'guildMembercount': gMember.guild.memberCount,
		'guildOwner' : gMember.guild.owner.user.username,
		'guildOwnerId' : gMember.guild.owner.id
	});
});
bot.on('guildDelete', async guild => {
	firebase.database().ref().update({
		[guild.id]: null
	});
	bot.user.setActivity('&help | ' + bot.guilds.cache.size.toString() + ' servers', { type: 'WATCHING' });
});

// Bot login
bot.login(token);