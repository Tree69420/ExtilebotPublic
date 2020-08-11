module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
	if (oofed) return;
    if (message.content.toLowerCase().includes('@everyone') || message.content.toLowerCase().includes('@here') || message.content.toLowerCase().includes('<@') && message.content.toLowerCase().includes('>')){
        message.channel.send('<@!' + message.author.id + '>, get pinged');
        return;
    }
    if (!args.length){
        message.channel.send('What is absolutely unreal?');
        return;
    }
    if (args.join(' ').toUpperCase() == args.join(' ') && args.join(' ').toLowerCase() != args.join(' ')){
        message.channel.send(args.join(' ') + ' IS ABSOLUTELY UNREAL!');
    }
    else{
        message.channel.send(args.join(' ') + ' is absolutely unreal!');
    }
}

module.exports.help = {
    name: 'unreal',
    syntax: 'unreal [message]',
    usage: 'Appends \"is absolutely unreal\" to the end of your message',
    perms: 'none'
}