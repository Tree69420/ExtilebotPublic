module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (!message.member.hasPermission('MANAGE_GUILD') && message.member.id != 532572460839731220){
        message.channel.send('You don\'t have perms to do this');
        return;
    }
    if (args.length == 0){
        message.channel.send('Specify a prefix');
        return;
    }
    let nPrefix = args;
    if (nPrefix.length != 1){
        message.channel.send('Prefixes can\'t have spaces');
        return;
    }
    if (prefix == nPrefix[0]){
        message.channel.send('Breh that\'s the same prefix LMAO');
        return;
    }
    firebase.database().ref(message.guild.id).update({
        'prefix' : nPrefix[0]
    }).then(() => {
        message.channel.send('Got it. ' + message.guild.name + '\'s prefix is now \`\`' + nPrefix[0] + '\`\`');
    });
}

module.exports.help = {
    name: 'prefix',
    syntax: 'prefix [new prefix]',
    usage: 'Changes the prefix to the specified one',
    perms: 'manage server'
}