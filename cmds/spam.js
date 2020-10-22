module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    if (message.author.id != 532572460839731220){
        message.channel.send('\'spam\' was not recognized as an internal or external command, operable program, or batch file\nUse ' + prefix + 'help to get my command list');
        return;
    }
    message.delete();
    var x = args[0];
    firebase.database().ref().once('value').then(function(snap) {
        if (snap.val()['m' + message.author.id] != null){
            mentionId = snap.val()['m' + message.author.id].target;
        }
    }).then(() => {
        for (var i = 0; i < x; i++){
            bot.users.cache.get(mentionId).send(args.slice(1).join(' ')).catch(error => {
                return;
            });
        }
    });
}
module.exports.help = {
    name: 'spam',
    syntax: 'asdfads',
    usage: 'sdaffdsasadfa',
    perms: 'fasdfsfsafsad'
}