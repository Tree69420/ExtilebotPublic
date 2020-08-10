module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    message.channel.send('Pinging...').then(message => {
        message.edit('Pong! \`\`ms\`\`');
    });
}
module.exports.help = {
    name: 'ping',
    syntax: 'ping',
    usage: 'Checks the ping for the bot',
    perms: 'none'
}