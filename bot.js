var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
//Write functions

function shuffle(s) {
	var arr = s.split('');
	var n = arr.length;
	
	for(var i=0 ; i<n-1 ; ++i) {
		var j = Math.floor(Math.random() * n);
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	s = arr.join('');
	return s;
}
function uwu(s) {
	var arr = s.split('');
	var n = arr.length;
	for (var i = 0; i < n-1; ++i){
		if (arr[i] == 'l' || arr[i] == 'r'){
			arr[i] = 'w';
		}
		if (arr[i] == 's'){
			arr[i] = 'sh';
		}
	}
	s = arr.join('');
	s = s + ' uwu';
	return s;
}
function eee(s){
	var arr = s.split('');
	var n = arr.length;
	var e = true;
	for (var i = 0; i < n-1; ++i){
		if (arr[i] != 'e'){
			e = false;
		}
	}
	return e;
}

//initialize vars
var hype = 0;


// Initialize Discord Bot
var bot = new Discord.Client();
bot.login('NzAyNTQxNjAxNTY5ODk4NjI4.XuePyw.ynZOEhJ5yNFZ7XFWEb98wzxEoGw');
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
	bot.user.setActivity("!help", {type: "WATCHING"});
	bot.user.setStatus('dnd');
});
bot.on('guildMemberAdd', function(member){
	member.send('Henlo, and welcome to this server!');
	//var WcChnl = bot.channels.find('name', 'welcome');
	//if (WcChnl){
		//WcChnl.send('<@!'+member.id+'> joined the server.');
	//}
});
bot.on('message', function (message) {
	var done = false;
	var msg = message.content;
	var prefix = '!';
	if (!message.author.bot){
		var obsession = false;
		var pingus = false;
		for (var i = 0; i < msg.length-7; i++){
			var lowerCaseMsg = msg.substring(i, i+8).toLowerCase();
			if (lowerCaseMsg == 'biswadev' ){
				obsession = true;
			}
			
		}//obsession check
		for (var i = 0; i < msg.length-8; i++){
			var lowerCaseMsg = msg.substring(i, i+8).toLowerCase();
			if (lowerCaseMsg == '@everyone' ){
				pingus = true;
			}
			
		}//@everyone check
		for (var i = 0; i < msg.length-5; i++){
			var lowerCaseMsg = msg.substring(i, i+8).toLowerCase();
			if (lowerCaseMsg == '@here' ){
				pingus = true;
			}
			
		}//@here check
		var punishrole = message.guild.roles.cache.find(role => role.name == "Punished");//find punished role
		var muterole = message.guild.roles.cache.find(role => role.name === "Muted");//find muted role
		if (obsession == true){
			message.delete();
			message.channel.send('Breh, it\'s called the forbidden name for a reason');
			message.channel.send('<@!'+ message.author.id.toString() + '>, Obsessed!');
			/*if (muterole){
				message.author.roles.add(muterole);
			}*/
			done = true;
		}//discipline
		if (done != true && eee(msg) == true && msg.length >= 5){
			message.channel.send('https://tenor.com/view/ea-sports-e-ea-meme-gif-14922519');
		}
		if (done != true && (msg == 'henlo' || msg == 'Henlo')){
			message.channel.send(msg+', <@!' + message.author.id + '>');
			done = true;
		}//henlo response
		if (done != true && (msg == 'lawl' || msg == 'Lawl')){
			message.channel.send('Lawl');
			done = true;
		}//lawl response
		if (done != true && msg.substring(0,7+prefix.length) == prefix+'kenhas '){
			var lastMsg = msg.substring(8, msg.length);
			message.channel.send(lastMsg + ': It\'s not as hard as you think - Kenhas, 2019');
			done = true;
		}//kenhas command
		if (done != true && msg == prefix+'ping'){
			message.channel.send('Pong!');
			done = true;
		}//ping command
		if (done != true && msg.substring(0, 7+prefix.length) == prefix + 'uwuify '){
			var lastMsg = msg.substring(7 + prefix.length, msg.length);
			message.delete();
			message.channel.send('<@!'+message.author.id + '>: '+uwu(lastMsg));
			done = true;
		}//uwuify command courtesy of jafzu
		if (done != true && msg.substring(0, 5+prefix.length) == prefix + 'hype '){
			var lastMsg = msg.substring(5 + prefix.length, msg.length);
			hype++;
			message.channel.send(hype.toString()+' hype for '+lastMsg);
			done = true;
		}//hype command
		if (done != true && msg.substring(0, 7+prefix.length) == prefix + 'unhype '){
			var lastMsg = msg.substring(7 + prefix.length, msg.length);
			hype--;
			message.channel.send(hype.toString()+' hype for '+lastMsg);
			done = true;
		}//unhype command
		if (done != true && msg == prefix + 'hype'){
			hype++;
			message.channel.send(hype.toString() + ' hype');
			done = true;
		}//hype command again
		if (done != true && msg == prefix + 'unhype'){
			hype--;
			message.channel.send(hype.toString() + ' hype');
			done = true;
		}//unhype command again
		if (done != true && msg.substring(0,5+prefix.length) == prefix+'name '){
			var lastMsg = msg.substring(5+prefix.length, msg.length);
			var capMsg = lastMsg.toUpperCase();
			var lowMsg = lastMsg.toLowerCase();
			if (capMsg == lastMsg && lowMsg != lastMsg){
				message.channel.send('MY NAME IS ' + lastMsg);
			}else{
				message.channel.send('My name is ' + lastMsg);
			}
			done = true;
		}//name command
		if (done != true && (msg.substring(0,6+prefix.length) == prefix+'purge ' || msg.substring(0,6+prefix.length) == prefix+'clear ')){
			if (!message.guild.me.hasPermission(['MANAGE_MESSAGES'])){
				msg.channel.send('Oops I don\'t have perms for that, plz give perms');
			}
			else{
				message.delete();
				if (message.member.hasPermission(['MANAGE_MESSAGES']) || message.author.id == 532572460839731220) {
					var lastMsg = msg.substring(6+prefix.length, msg.length);
					if (parseInt(lastMsg, 10) && !isNaN(parseInt(lastMsg, 10))){
						if (parseInt(lastMsg, 10) != 1){
							message.delete();
						}
						message.channel.bulkDelete(parseInt(lastMsg, 10));
						if (parseInt(lastMsg, 10) != 1){
						message.channel.send('<@!'+message.author.id + '> Purged '+parseInt(lastMsg, 10).toString() + ' messages');
						}
						else{
							message.channel.send('<@!'+message.author.id+'> Purged 1 message')
						}
					}
					else{
						message.channel.send('Lawl put a number')
					}
				}
				else{
					message.channel.send('<@!' + message.author.id + '>, you can\'t do that LAWL')
				}
			}
			done = true;
		}//purge command
		if (done != true && msg.substring(0, 4+prefix.length) == prefix+'ban '){
			message.delete();
			var user = message.mentions.members.first();
			if (message.member.hasPermission(['BAN_MEMBERS']) || message.author.id == 532572460839731220) {
				if (user){
					var user = message.guild.member(user);
					if (user){
						var reason = msg.split(' ').slice(2);
						if (!reason){
							reason = 'no reason'
						}
						if (!user.bannable){
							message.channel.send('Oops I can\'t ban him/her. More power plz');
						}
						else{
							//user.send('You were banned for '+reason);
							user.ban();
						}
					}
					else{
						message.channel.send('That person isn\'t in this server')
					}
				}
				else{
					message.channel.send('That person doesn\'t exist')
				}
			}
			else{
					message.channel.send('<@!'+message.author.id + '>, you can\'t do that LAWL')
			}
			done = true;
		}//ban command
		if (done != true && msg.substring(0, 5+prefix.length) == prefix+'kick '){
			message.delete();
			var user = message.mentions.members.first();
			if (message.member.hasPermission(['KICK_MEMBERS']) || message.author.id == 532572460839731220) {
				if (user){
					var reason = msg.split(' ').slice(2);
					if (!reason){
						reason = 'no reason'
					}
					if (!user.kickable){
						message.channel.send('Oops I can\'t kick him/her. More power plz');
					}
					else{
						//user.send('you were kicked for '+ reason);
						user.kick();
					}
				}
				else{
					message.channel.send('That person doesn\'t exist')
				}
			}
			else{
					message.channel.send('<@!'+message.author.id + '>, you can\'t do that LAWL')
				}
		}//kick command
		if (done != true && msg.substring(0, 7+prefix.length) == prefix+'unmute '){
			message.delete();
			var user = message.mentions.members.first();
			if (message.member.hasPermission(['MANAGE_ROLES']) || message.author.id == 532572460839731220) {
				if (user){
					var reason = msg.split(' ').slice(2);
					if (!muterole){
						message.channel.send('Oops there\'s no muted role.\nWait breh how can you be muted if there\'s no muted role.')
					}
					else{
						if (user.roles.cache.has(muterole.id)) {
							user.roles.remove(muterole);
							message.channel.send('<@!'+user.id+'> was unmuted');
						}
						else{
							message.channel.send('<@!'+user.id+'> isn\'t even muted, you bot');
						}
					}
				}
				else{
					message.channel.send('That person doesn\'t exist')
				}
			}
			else{
					message.channel.send('<@!'+message.author.id + '>, you can\'t do that LAWL')
				}
		}//unmute command
		if (done != true && msg.substring(0, 5+prefix.length) == prefix+'mute '){
			message.delete();
			var user = message.mentions.members.first();
			if (message.member.hasPermission(['MANAGE_ROLES']) || message.author.id == 532572460839731220) {
				if (user){
					var reason = msg.split(' ').slice(2);
					if (!muterole){
						message.channel.send('Oops there\'s no muted role');
					}
					else{
						if (!user.roles.cache.has(muterole.id)){
							user.roles.add(muterole);
							if (reason){
								message.channel.send('<@!'+user.id+'> was muted for ' + reason);
							}
							else{
								message.channel.send('<@!'+user.id+'> was muted for no reason');
							}
						}
						else{
							message.channel.send('<@!'+user.id+'> is already muted, you bot');
						}
					}
				}
				else{
					message.channel.send('That person doesn\'t exist')
				}
			}
			else{
					message.channel.send('<@!'+message.author.id + '>, you can\'t do that LAWL')
				}
		}//mute command
		if (done != true && msg.substring(0, 7+prefix.length) == prefix+'punish '){
			message.delete();
			var user = message.mentions.members.first();
			if (message.member.hasPermission(['MANAGE_ROLES']) || message.author.id == 532572460839731220) {
				if (user){
					if (!user.bot && user.id !=591051639213785088 && user.id != 633786053903515648){
						if (!punishrole){
							message.channel.send('Oops there\'s no punished role');
						}
						else{ 	
							if(!user.roles.cache.has(punishrole.id)){
								user.roles.add(punishrole);
								message.channel.send('<@!'+user.id+'> was punished');
							}
							else{
								message.channel.send('<@!'+user.id+'> is already punished, you bot\nTanqies, Bjarnav');
							}
						}
					}
					else{
						message.channel.send('LAWL you can\'t punish a bot')
					}
				}
				else{
					message.channel.send('That person doesn\'t exist')
				}
			}
			else{
				message.channel.send('<@!'+message.author.id + '>, you can\'t do that LAWL')
			}
		}//punish command courtesy of aaronwho, not stolen from kyght proht
		if (done != true && msg.substring(0, 9+prefix.length) == prefix+'unpunish '){
			message.delete();
			var user = message.mentions.members.first();
			if (message.member.hasPermission(['MANAGE_ROLES']) || message.author.id == 532572460839731220) {
				if (user){
					if (!user.bot && user.id !=591051639213785088 && user.id != 633786053903515648){
						if (!punishrole){
							message.channel.send('Oops there\'s no punished role');
						}
						else{
							if(user.roles.cache.has(punishrole.id)){
								user.roles.remove(punishrole);
								message.channel.send('<@!'+user.id+'> was unpunished');
							}
							else{
								message.channel.send('<@!'+user.id+'> isn\'t punished, you bot\nTanqies, Bjarnav');
							}
						}
					}
					else{
						message.channel.send('LAWL you can\'t punish a bot')
					}
				}
				else{
					message.channel.send('That person doesn\'t exist')
				}
			}
			else{
				message.channel.send('<@!'+message.author.id + '>, you can\'t do that LAWL')
			}
			done = true;
		}//unpunish command
		if (done != true && (msg.substring(0, 3) == 'Im ' || msg.substring(0, 3) == 'im ')){
			var lastMsg = msg.substring(3, msg.length);
			message.channel.send('Hi ' + lastMsg + ', I\'m Extile');
		}//LAWL
		if (done != true && (msg.substring(0, 4) == 'I\'m ' || msg.substring(0, 4) == 'i\'m ')){
			var lastMsg = msg.substring(4, msg.length);
			message.channel.send('Hi ' + lastMsg + ', I\'m Extile');
		}//LAWL
		if(punishrole){
			if(done != true && message.member.roles.cache.has(punishrole.id)){
				message.delete();
				var newMsg = shuffle(msg);
				message.channel.send("<@!"+message.author.id+'>: '+newMsg);
			}
		}//scrambling for punished
	}
});
