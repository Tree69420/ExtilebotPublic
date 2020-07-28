module.exports.run = async (bot, message, args, firebase, prefix) => {
    var rollNo = 1;
    var rollMin = 1;
    var rollMax = 6;
    if (args){
        if (parseInt(args[0], 10)){
            rollNo = parseInt(args[0], 10);
        }
        if (args.length > 1){
            if (parseInt(args[1], 10)){
                rollMin = parseInt(args[1], 10);
            }
            if (args.length > 2){
                if (parseInt(args[2], 10)){
                    rollMax = parseInt(args[2], 10);
                }
            }
        }
    }
    if (rollNo == 0){
        message.channel.send('You can\'t roll 0 times');
        return;
    }
    if (rollNo < 0){
        message.channel.send('You can\'t roll a negative amount of times');
        return;
    }
    if (rollNo >= 70){
        message.channel.send('Breh stop, it will lag');
        return;
    }
    if (rollMin < rollMax){
        message.channel.send('The minimum can\'t be less than the maximum!');
        return;
    }
    if (rollMax > 99){
        message.channel.send('The maximum is too large, it will lag');
        return;
    }
    if (rollMin < -99){
        message.channel.send9('The minimum is too small, it will lag');
        return;
    }
    var rollArr = [];
    for (var i = 0; i < amount; i++){
        rollArr.push((Math.floor((rollMax - rollMin + 1) * Math.random()) + rollMin).toString());
    }
    message.channel.send(rollArr.join(', '));
}
module.exports.help = {
    name: 'roll',
    syntax: 'roll [amount(optional)] [minimum number(optional)] [maximum number(optional)]',
    usage: 'Rolls a die that can be a number from the minimum specified to the maximum specified, or from 1 to 6 if not specified, the specified amount of times or once',
    perms: 'none'
}