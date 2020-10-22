var list = {
    mute: 'mute',
    punish: 'punish',
    ban: 'ban',
    kick: 'kick',
    aphasia: 'aphasia'
}
module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    var punishment = 'mute';
    if (args.length == 0){
        message.channel.send('The banphrase can\'t be blank!');
        return;
    }
    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.member.id != 532572460839731220 && message.member.id != message.guild.ownerID){
        message.channel.send('Insufficient permissions');
        return;
    }
    var bphrase = await args.join(' ');
    if (list[args[0].toLowerCase()]){
        punishment = args[0].toLowerCase();
        bphrase = args.slice(1).join(' ');
    }
    if (bphrase.length < 3){
        message.channel.send('Don\'t you think that might be a little short?');
        return;
    }
    if (punishment){
        firebase.database().ref(message.guild.id + '/bphrases').update({
            [bphrase]: punishment
        });
        message.channel.send('The banphrase was added, with punishment ' + punishment);
    }
}

module.exports.help = {
    name: 'banphrase',
    syntax: 'banphrase [punishment(optional)] [phrase]',
    usage: 'Every time the specified phrase is typed, the punishment specified, or mute, will be applied to the author of that message',
    perms: 'manage messages'
}