const replist = require('../8ball.json').replies;
module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (!args){
        message.channel.send('Breh what\'s your question?');
        return;
    }
    if (!args.length){
        message.channel.send('Breh what\'s your question?');
        return;
    }
    message.channel.send('<@!' + message.author.id + '>, ' + replist[Math.floor(Math.random() * replist.length)]);
}
module.exports.help = {
    name: 'eightball',
    syntax: 'eightball [question]',
    usage: 'Asks the magic 8ball your question',
    perms: 'none'
}