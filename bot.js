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
function testdadjoke(s){
	if (s.startsWith('i am ') || s.startsWith('i\'m ') || s.startsWith('im ') || s.startsWith('i‘m ') || s.startsWith('i’m ')){
		return true;
	}
}
function dadjoke(s = ''){
	for (var i = 0; i < s.length - 1; i++){
		if (testdadjoke(s.split(' ').slice(i).join(' ').toLowerCase())){
			var t = s.split(' ').slice(i).join(' ');
			if (s.toLowerCase().startsWith('i am')){
				return t.split(' ').slice(2).join(' ');
			}
			return t.split(' ').slice(1).join(' ');
		}
	}
	return false;
}
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
});

bot.on('ready', async () => {
	console.log('Hello, I\'m ready');
	bot.user.setActivity('&help | ' + bot.guilds.cache.size.toString() + ' servers', { type: 'WATCHING' });
});
bot.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.content == 'Pinging...' && oldMessage.author.id == bot.user.id) {
        var oldMessageTimestamp = oldMessage.createdTimestamp;
        var newMessageTimestamp = newMessage.editedTimestamp;
        newMessage.edit(`Pong! \`\`${Math.floor(newMessageTimestamp - oldMessageTimestamp)}ms\`\``);
	}
	var msg = newMessage.content.split('‍\u200b').join('');
	if (msg.toLowerCase().includes('biswadev')){
		firebase.database().ref(newMessage.guild.id + '/punishedMembers').update({
			[newMessage.author.id]: newMessage.author.id
		});
		newMessage.delete();
		newMessage.channel.send('<@!' + newMessage.author.id + '>, Obsessed!');
		newMessage.channel.send('<@!' + newMessage.author.id + '> was punished for obsession');
	}
	var bphrases;
	firebase.database().ref(newMessage.guild.id).once('value').then(function (snap) {
		if (snap.val()){
			if (snap.val().bphrases){
				bphrases = snap.val().bphrases;
			}
		}
	}).then(() => {
		for (var phrase in bphrases){
			if (msg.toLowerCase().includes(phrase) && !(msg.startsWith(prefix) && newMessage.member.hasPermission('MANAGE_MESSAGES'))){
				if (bphrases[phrase] == 'ban'){
					newMessage.channel.send('<@' + newMessage.member.id + '> was banned for saying a banned phrase');
					newMessage.member.ban('Saying a banned phrase');
				}
				if (bphrases[phrase] == 'kick'){
					newMessage.channel.send('<@' + newMessage.member.id + '> was kicked for saying a banned phrase');
					newMessage.member.kick('Saying a banned phrase');
				}
				if (bphrases[phrase] == 'aphasia'){
					newMessage.channel.send('<@' + newMessage.member.id + '> was inflicted with aphasia for saying a banned phrase');
					firebase.database().ref(newMessage.guild.id + '/aphasicMembers').update({
						[newMessage.author.id]: newMessage.author.id
					});
				}
				if (bphrases[phrase] == 'punish'){
					newMessage.channel.send('<@' + newMessage.member.id + '> was punished for saying a banned phrase');
					firebase.database().ref(newMessage.guild.id + '/punishedMembers').update({
						[newMessage.author.id]: newMessage.author.id
					});
				}
				if (bphrases[phrase] == 'mute'){
					var muterole = newMessage.guild.roles.cache.find(role => role.name == "Muted");//find muted role
					if (!muterole){
						muterole = newMessage.guild.roles.create({
							data: {
								name: 'Muted',
								hoist: false,
								permissions: 263232,
								mentionable: false,
							}
						});
					}
					newMessage.guild.channels.cache.forEach(tc => {
						tc.updateOverwrite(muterole, {
							SEND_MESSAGES: false,
							SPEAK: false
						});
					});
					newMessage.channel.send('<@' + newMessage.member.id + '> was muted for saying a banned phrase');
					newMessage.member.roles.add(muterole);
				}
				usedbphrase = true;
			}
		}
		if (usedbphrase){
			newMessage.delete();
			return;
		}
	});
});//ping command
bot.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	var punished = false;
	var aphasic = false;
	var obsessed = false;
	var prefix = '&';
	var pingus = false;
	var oofed = true;
	var dadjoking = true;
	var eeeee = true;
	var lawl = true;
	var henlo = true;
	var msg = message.content.split('‍‍\u200b').join('');
	var bphrases;
	if (message.content.includes('@everyone') || message.content.includes('@here') || (message.content.includes('<@') && message.content.includes('>'))) pingus = true;
	firebase.database().ref(message.guild.id).once('value').then(function (snap) {
		if (msg.toLowerCase().includes('biswadev')) obsessed = true;
		if (snap.val()){
			prefix = snap.val().prefix;
			if (snap.val().punishedMembers){
				if (snap.val().punishedMembers[message.author.id]){
					punished = true;
				}
			}
			if (snap.val().bphrases){
				bphrases = snap.val().bphrases;
			}
			if (snap.val().aphasicMembers){
				if (snap.val().aphasicMembers[message.author.id]){
					aphasic = true;
				}
			}
			if (snap.val().aresp){
				dadjoking = snap.val().dadjoking;
				eeeee = snap.val().eeeee;
				lawl = snap.val().lawl;
				henlo = snap.val().henlo;
			}
		}
	}).then(() => {
		if (true){
			if (eee(msg) == true && msg.length >= 5 && eeeee){
				message.channel.send('https://tenor.com/view/ea-sports-e-ea-meme-gif-14922519');
				return;
			}//eee response
			if ((msg.toLowerCase() == 'henlo') && henlo){
				message.channel.send('Henlo, <@!' + message.author.id + '>');
				return;
			}//henlo response
			if ((msg.toLowerCase() == 'lawl') && lawl){
				message.channel.send('Lawl');
				return;
			}//lawl response
			if (!pingus && message.content.toLowerCase().substring(0,18) == 'alexa, simon says '){
				message.delete();
				message.channel.send(message.content.split(' ').slice(3).join(' '));
				return;
			}//repeat after me
		}//autoresponses
		if (obsessed){
			firebase.database().ref(message.guild.id + '/punishedMembers').update({
				[message.author.id] : message.author.id
			}).then(() => {
				message.delete();
				message.channel.send('<@!' + message.author.id + '>, Obsessed!');
				message.channel.send('<@!' + message.author.id + '> was punished for obsession');
				return;
			});
			return;
		}//obsession
		var usedbphrase = false;
		for (var phrase in bphrases){
			if (msg.toLowerCase().includes(phrase) && !(msg.startsWith(prefix) && message.member.hasPermission('MANAGE_MESSAGES'))){
				if (bphrases[phrase] == 'ban'){
					message.channel.send('<@' + message.member.id + '> was banned for saying a banned phrase');
					message.member.ban('Saying a banned phrase');
				}
				if (bphrases[phrase] == 'kick'){
					message.channel.send('<@' + message.member.id + '> was kicked for saying a banned phrase');
					message.member.kick('Saying a banned phrase');
				}
				if (bphrases[phrase] == 'aphasia'){
					message.channel.send('<@' + message.member.id + '> was inflicted with aphasia for saying a banned phrase');
					firebase.database().ref(message.guild.id + '/aphasicMembers').update({
						[message.author.id]: message.author.id
					});
				}
				if (bphrases[phrase] == 'punish'){
					message.channel.send('<@' + message.member.id + '> was punished for saying a banned phrase');
					firebase.database().ref(message.guild.id + '/punishedMembers').update({
						[message.author.id]: message.author.id
					});
				}
				if (bphrases[phrase] == 'mute'){
					var muterole = message.guild.roles.cache.find(role => role.name == "Muted");//find muted role
					if (!muterole){
						muterole = message.guild.roles.create({
							data: {
								name: 'Muted',
								hoist: false,
								permissions: 263232,
								mentionable: false,
							}
						});
					}
					message.guild.channels.cache.forEach(tc => {
						tc.updateOverwrite(muterole, {
							SEND_MESSAGES: false,
							SPEAK: false
						});
					});
					message.channel.send('<@' + message.member.id + '> was muted for saying a banned phrase');
					message.member.roles.add(muterole);
				}
				usedbphrase = true;
			}
		}
		if (usedbphrase){
			message.delete();
			return;
		}
		let message_array = msg.split(' ');
		let command = message_array[0];
		let args = message_array.slice(1);
		if (punished){
			message.delete().catch(error => {
				message.channel.send('Give message deletion perms please');
			});
			if (msg.includes('$') || msg.includes(',tex') || msg.includes('~tex')) {
				message.channel.send(`${message.author}: ${scramble(msg)}`).then(function() {
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
				message.channel.send(`${message.author}: ${scramble(msg)}`);
			}
		}//punished scrambling
		if (aphasic){
			if (!punished){
				message.delete().catch(error => {
					message.channel.send('Give message deletion perms please');
				});
			}
			if (msg.includes('$') || msg.includes(',tex') || msg.includes('~tex')) {
				message.channel.send(`${message.author}: ${aphasia(msg)}`).then(function() {
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
				message.channel.send(`${message.author}: ${aphasia(msg)}`);
			}
		}//aphasic randomwordsing
		if (!punished && !aphasic && dadjoking){
			if (!pingus && dadjoke(msg)){
				var joke = dadjoke(msg);
				message.channel.send('Hi ' + joke + ', I\'m Extile');
				return;
			}//dad jokes
			oofed = false;
		}
		if (!command.startsWith(prefix)) return;
		if (bot.commands.get(command.slice(prefix.length))){
			let cmd = bot.commands.get(command.slice(prefix.length));
			if (cmd){
				console.log(message.author.username + ' ran the ' + command + ' command');
				cmd.run(bot, message, args, firebase, prefix, oofed);
				return;
			}
			message.channel.send('\'' + msg + '\'is not recognized as an internal or external command, operable program, or batch file\nUse ' + prefix + 'help to get my command list');
		}
	});
});
bot.on('guildCreate', async gData => {
	gData.systemChannel.createInvite({
		maxAge: 0,
		unique: false
	}).then(inv => {
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
			'hype': 0,
			'aresp': {
				'dadjoking': true,
				'eeeee': true,
				'lawl': true,
				'henlo': true
			},
			'invite': inv.url,
			
		});
	});
	gData.systemChannel.send('Hello, I\'m Extile! Use &help to access my help function, and join my support server at https://discord.gg/HaJQ3vU for any questions, comments, or suggestions!');
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