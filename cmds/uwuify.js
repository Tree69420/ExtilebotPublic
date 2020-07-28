module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (message.content.toLowerCase().includes('@everyone') || message.content.toLowerCase().includes('@here') || message.content.toLowerCase().includes('<@') && message.content.toLowerCase().includes('>')){
        message.channel.send('<@!' + message.author.id + '>, get pinged');
        return;
    }
    var arr = args.join(' ').split('');
	var n = arr.length;
	for (var i = 0; i < arr.length; i++){
		switch (arr[i]){
			case 'l':
                arr[i] = 'w';
                break;
			case 'r':
                arr[i] = 'w';
                break;
			case 's':
                arr[i] = 'sh';
                break;
			case 'L':
				arr[i] = 'W';
				break;
			case 'R':
                arr[i] = 'W';
                break;
			case 'S':
				arr[i] = 'SH';
				break;
			default:
				break;
		}
	}
	message.channel.send(message.member.displayName + ': ' + arr.join('') + ' uwu');
}

module.exports.help = {
    name: 'uwuify',
    syntax: 'uwuify [message]',
    usage: 'Uwuifies your message',
    perms: 'none'
}