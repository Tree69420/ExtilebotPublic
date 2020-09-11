var possible = {
    'dadjoking': 'dadjoking',
    'eeeee': 'eeeee',
    'lawl': 'lawl',
    'henlo': 'henlo'
}
module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (!args.length){
        message.channel.send('Specify the autoresponse you want to disable!');
        return;
    }
    if (!possible[args[0]]){
        message.channel.send('Invalid argument');
        return;
    }
    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.member.id != 532572460839731220){
        message.channel.send('Insufficient permissions');
        return;
    }
    firebase.database().ref(message.guild.id + '/aresp').update({
        [args[0]]: false
    });
    message.channel.send('The autoresponse ' + args[0] + ' was disabled');
}
module.exports.help = {
    name: 'disable',
    syntax: 'disable [autoresponse]\n[autoresponse] can be dadjoking, eeeee, lawl, or henlo',
    usage: 'Disables the specified autoresponse',
    perms: 'manage messages'
}