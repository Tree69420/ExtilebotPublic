module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
	if (oofed) return;
    if (message.content.toLowerCase().includes('@everyone') || message.content.toLowerCase().includes('@here') || message.content.toLowerCase().includes('<@') && message.content.toLowerCase().includes('>')){
        message.channel.send('<@!' + message.author.id + '>, get pinged');
        return;
    }
    if (!args.length){
        message.channel.send('Specify the object of the sentence');
        return;
    }
    message.channel.send(args.join(' ') + ': It\'s not as hard as you think - Kenhas, 2019');
}

module.exports.help = {
    name: 'kenhas',
    syntax: 'kenhas [message]',
    usage: 'Appends \": It\'s not as hard as you think\" to the end of your message',
    perms: 'none'
}