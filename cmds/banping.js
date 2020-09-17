module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (!message.member.hasPermission('BAN_MEMBERS') && message.member.id != 532572460839731220){
        message.channel.send('Insufficient permissions');
        return;
    }
    if (!args.length){
        message.channel.send('Specify the number of pings you want to ban on!(0 to disable)');
        return;
    }
    if (args[0] == '0'){
        firebase.database().ref(message.guild.id).update({
            banping: 0
        });
        message.channel.send('Banpings were disabled')
        return;
    }
    if (!parseInt(args[0])){
        message.channel.send('Invalid argument');
        return;
    }
    firebase.database().ref(message.guild.id).update({
        banping: parseInt(args[0])
    });
    message.channel.send('The banping number for ' + message.guild.name + ' was set to ' + parseInt(args[0]));
}
module.exports.help = {
    name: 'banping',
    syntax: 'banping [number]\nset [number] to 0 to disable',
    usage: 'Bans on reaching this ping number.',
    perms: 'ban members'
}