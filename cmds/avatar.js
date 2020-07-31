module.exports.run = async (bot, message, args, firebase, prefix) => {
    if (args.length == 0){
        message.channel.send(message.author.displayAvatarURL());
        return;
    }
    var mentionId;
    if (message.mentions.members.first()){
        mentionId = message.mentions.members.first().id;
    }
    if (!mentionId && parseInt(args[0], 10)){
        mentionId = parseInt(args[0], 10);
    }
    if (!mentionId){
        message.channel.send(message.author.displayAvatarURL());
        return;
    }
    if (!bot.users.cache.get(mentionId.toString())) return;
    if (!bot.users.cache.get(mentionId.toString()).displayAvatarURL()){
        message.channel.send(' is a default avatar');
        return;
    };
    message.channel.send(message.guild.members.cache.get(mentionId.toString()).user.displayAvatarURL());
}
module.exports.help = {
    name: 'avatar',
    syntax: 'avatar [user(optional)]\n[user] can be a mention or an id',
    usage: 'Sends the avatar of the person mentioned, or the user',
    perms: 'none'
}