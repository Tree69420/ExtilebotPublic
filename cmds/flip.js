module.exports.run = async (bot, message, args, firebase, prefix, oofed) => {
    var flipNo = 1;
    if (args){
        if (parseInt(args[0], 10)){
            flipNo = parseInt(args[0], 10);
        }
    }
    if (flipNo == 0){
        message.channel.send('You can\'t flip 0 times');
        return;
    }
    if (flipNo < 0){
        message.channel.send('You can\'t flip a negative amount of times');
        return;
    }
    if (flipNo >= 70){
        message.channel.send('Breh stop, it will lag');
        return;
    }
    var flipStr = "";
    var htarr = ['H', 'T']
    var flipArr = [];
    for (var i = 0; i < flipNo; i++){
        flipArr.push(htarr[Math.floor(Math.random())]);
    }
    message.channel.send(flipArr.join(', '));
}
module.exports.help = {
    name: 'flip',
    syntax: 'flip [amount(optional)]',
    usage: 'Flips a coin a certain amount of times or once',
    perms: 'none'
}