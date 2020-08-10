module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
	if (oofed) return;
    if (message.content.toLowerCase().includes('@everyone') || message.content.toLowerCase().includes('@here') || message.content.toLowerCase().includes('<@') && message.content.toLowerCase().includes('>')){
        message.channel.send('<@!' + message.author.id + '>, get pinged');
        return;
    }
    if (!args) return;
    if (args.join(' ').toUpperCase() == args.join(' ') && args.join(' ').toLowerCase() != args.join(' ')){
        message.channel.send('MY NAME IS ' + args.join(' '));
    }
    else{
        message.channel.send('My name is ' + args.join(' '));
    }
}

module.exports.help = {
    name: 'name',
    syntax: 'name [message]',
    usage: 'Appends \": My name is\" to the beginning of your message',
    perms: 'none'
}