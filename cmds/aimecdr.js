module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    message.channel.send('https://mathblitz.herokuapp.com');
}
module.exports.help = {
    name: 'aimecdr',
    syntax: 'aimecdr',
    usage: 'Sends a link to the game of AIME CDR',
    perms: 'none'
}