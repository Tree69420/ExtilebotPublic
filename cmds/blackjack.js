var bjCards = ['A','2','3','4','5','6','7','8','9','10','J','Q','K','A','2','3','4','5','6','7','8','9','10','J','Q','K','A','2','3','4','5','6','7','8','9','10','J','Q','K','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
function arrShuffle(arr){
	var n = arr.length;
	for(var i = 0 ; i<n-1 ; ++i) {
		var j = Math.floor(Math.random() * n);
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}//array scrambling 
function bjScore(arr){
	var n = arr.length;
	var curSum = 0;
	var hasAce = false;
	for (var i = 0; i < n; i++){
		switch (arr[i]){
			case 'A':
				curSum++;
				hasAce = true;
				break;
			case '2':
				curSum += 2;
				break;
			case '3':
				curSum += 3;
				break;
			case '4':
				curSum += 4;
				break;
			case '5':
				curSum += 5;
				break;
			case '6':
				curSum += 6;
				break;
			case '7':
				curSum += 7;
				break;
			case '8':
				curSum += 8;
				break;
			case '9':
				curSum += 9;
				break;
			default:
				curSum += 10;
		}
	}
	if (hasAce && curSum <= 11){
		curSum += 10;
	}
	return curSum;
}//blackjack score calc
module.exports.run = async (bot, message, args, firebase, prefix) => {
    var bjList;
    var reason = 'no reason';
    firebase.database().ref('blackjack').once('value').then(function(snap) {
        if (snap.val() != null){
            bjList = snap.val();
        }
    }).then(() => {
        if (!bjList){
            return;
        }
        if (bjList[message.author.id]){
            message.channel.send('You are already playing a game of blackjack!');
            return;
        }
        firebase.database().ref('blackjack').update({
            [message.author.id] : 1
        });
        var curCards = arrShuffle(bjCards);
        var card1 = curCards.pop();
        var card2 = curCards.pop();
        var dCard1 = curCards.pop();
        var dCard2 = curCards.pop();
        var statsArr = [curCards, [card1, card2], [dCard1, dCard2]];
        if (bjScore([card1, card2]) == 21){
            message.channel.send('You got to 21!\nYour cards: ' + card1 + ',' + card2 + '\nDealer cards: ' + dCard1 + ',' + dCard2 + '\nTo play again, type ' + prefix + 'blackjack');
            firebase.database().ref('blackjack').update({
                [message.author.id] : null
            });
            return;
        }
        if (bjScore([dCard1,dCard2]) == 21){
            message.channel.send('You lost!\nYour cards: ' + card1 + ',' + card2 + '\nDealer cards: ' + dCard1 + ',' + dCard2 + '\nYour score: ' + curScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
            firebase.database().ref('blackjack').update({
                [message.author.id] : null
            });
            return;
        }
        message.channel.send('Your cards: ' + card1 + ',' + card2 + '\nDealer\'s cards: ' + dCard1 + ', ?\nYour score: ' + bjScore([card1,card2]) + '\nType \'hit\' or \'stand\' to hit or stand, respectively, or \'quit\' to quit');
        const filter = response => {
            if (response.author.id == message.author.id && (response.content == 'hit' || response.content == 'stand' || response.content == 'quit')) {
                return true;
            }
            else {
                return false;
            }
        }
        message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(function(collected) {
            if (collected.first().content == 'quit'){
                message.channel.send('You quit.');
                firebase.database().ref('blackjack').update({
                    [message.author.id] : null
                });
                return;
            }
            if (collected.first().content == 'stand'){
				var cardsLeft = statsArr[0];
				var curCards = statsArr[1];
				var dealerCards = statsArr[2];
				var dealerScore = bjScore(dealerCards);
				var curScore = bjScore(curCards);
				while (dealerScore <= curScore && dealerScore < 21){
					var nextCard = cardsLeft.pop();
					dealerCards.push(nextCard);
					dealerScore = bjScore(dealerCards);
				}
                var curCardString = curCards.join(',');
                dealerCardString = dealerCards.join(',');
				if (dealerScore > 21){
                    message.channel.send('Dealer busts with a ' + dealerScore + ', you win!\nYour cards: ' + curCardString + '\nDealer cards: ' + dealerCardString + '\nYour score: ' + curScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
                    firebase.database().ref('blackjack').update({
                        [message.author.id] : null
                    });
                    return;
				}
				message.channel.send('You lost!\nYour cards: ' + curCardString + '\nDealer cards: ' + dealerCardString + '\nYour score: ' + curScore.toString() + '\nDealer\'s score: ' + dealerScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
                firebase.database().ref('blackjack').update({
                    [message.author.id] : null
                });
                return;
            }
            var cardsLeft = statsArr[0];
            var curCards = statsArr[1];
            var card1 = cardsLeft.pop();
            statsArr[1].push(card1);
            var curScore = bjScore(statsArr[1]);
            var curCardString = curCards.join(',');
            if (curScore == 21){
                message.channel.send('You got to 21!\nYour cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ',' + statsArr[2][1] + '\nTo play again, type ' + prefix + 'blackjack');
                firebase.database().ref('blackjack').update({
                    [message.author.id] : null
                });
                return;
            }
            if (curScore > 21){
                message.channel.send('You busted with a ' + curScore + '!\nYour cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ',' + statsArr[2][1] + '\nTo play again, type ' + prefix + 'blackjack');
                firebase.database().ref('blackjack').update({
                    [message.author.id] : null
                });
                return;
            }
            message.channel.send('Your cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ', ?\nYour score: ' + curScore.toString() + '\nType \'hit\' or \'stand\' to hit or stand, respectively, or \'quit\' to quit');
            message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(function(collected) {
                if (collected.first().content == 'quit'){
                    message.channel.send('You quit.');
                    firebase.database().ref('blackjack').update({
                        [message.author.id] : null
                    });
                    return;
                }
                if (collected.first().content == 'stand'){
                    var cardsLeft = statsArr[0];
                    var curCards = statsArr[1];
                    var dealerCards = statsArr[2];
                    var dealerScore = bjScore(dealerCards);
                    var curScore = bjScore(curCards);
                    while (dealerScore <= curScore && dealerScore < 21){
                        var nextCard = cardsLeft.pop();
                        dealerCards.push(nextCard);
                        dealerScore = bjScore(dealerCards);
                    }
                    var curCardString = curCards.join(',');
                    dealerCardString = dealerCards.join(',');
                    if (dealerScore > 21){
                        message.channel.send('Dealer busts with a ' + dealerScore + ', you win!\nYour cards: ' + curCardString + '\nDealer cards: ' + dealerCardString + '\nYour score: ' + curScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
                        firebase.database().ref('blackjack').update({
                            [message.author.id] : null
                        });
                        return;
                    }
                    message.channel.send('You lost!\nYour cards: ' + curCardString + '\nDealer cards: ' + dealerCardString + '\nYour score: ' + curScore.toString() + '\nDealer\'s score: ' + dealerScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
                    firebase.database().ref('blackjack').update({
                        [message.author.id] : null
                    });
                    return;
                }
                var cardsLeft = statsArr[0];
				var curCards = statsArr[1];
                var card1 = cardsLeft.pop();
                statsArr[1].push(card1);
                var curScore = bjScore(statsArr[1]);
                var curCardString = curCards.join(',');
                if (curScore == 21){
                    message.channel.send('You got to 21!\nYour cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ',' + statsArr[2][1] + '\nTo play again, type ' + prefix + 'blackjack');
                    firebase.database().ref('blackjack').update({
                        [message.author.id] : null
                    });
                    return;
                }
                if (curScore > 21){
                    message.channel.send('You busted with a ' + curScore + '!\nYour cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ',' + statsArr[2][1] + '\nTo play again, type ' + prefix + 'blackjack');
                    firebase.database().ref('blackjack').update({
                        [message.author.id] : null
                    });
                    return;
                }
                message.channel.send('Your cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ', ?\nYour score: ' + curScore.toString() + '\nType \'hit\' or \'stand\' to hit or stand, respectively, or \'quit\' to quit');
                message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(function(collected) {
                    if (collected.first().content == 'quit'){
                        message.channel.send('You quit.');
                        firebase.database().ref('blackjack').update({
                            [message.author.id] : null
                        });
                        return;
                    }
                    if (collected.first().content == 'stand'){
                        var cardsLeft = statsArr[0];
                        var curCards = statsArr[1];
                        var dealerCards = statsArr[2];
                        var dealerScore = bjScore(dealerCards);
                        var curScore = bjScore(curCards);
                        while (dealerScore <= curScore && dealerScore < 21){
                            var nextCard = cardsLeft.pop();
                            dealerCards.push(nextCard);
                            dealerScore = bjScore(dealerCards);
                        }
                        var curCardString = curCards.join(',');
                        dealerCardString = dealerCards.join(',');
                        if (dealerScore > 21){
                            message.channel.send('Dealer busts with a ' + dealerScore + ', you win!\nYour cards: ' + curCardString + '\nDealer cards: ' + dealerCardString + '\nYour score: ' + curScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
                            return;
                        }
                        message.channel.send('You lost!\nYour cards: ' + curCardString + '\nDealer cards: ' + dealerCardString + '\nYour score: ' + curScore.toString() + '\nDealer\'s score: ' + dealerScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
                        firebase.database().ref('blackjack').update({
                            [message.author.id] : null
                        });
                        return;
                    }
                    var cardsLeft = statsArr[0];
                    var curCards = statsArr[1];
                    var card1 = cardsLeft.pop();
                    statsArr[1].push(card1);
                    var curScore = bjScore(statsArr[1]);
                    var curCardString = curCards.join(',');
                    if (curScore == 21){
                        message.channel.send('You got to 21!\nYour cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ',' + statsArr[2][1] + '\nTo play again, type ' + prefix + 'blackjack');
                        firebase.database().ref('blackjack').update({
                            [message.author.id] : null
                        });
                        return;
                    }
                    if (curScore > 21){
                        message.channel.send('You busted with a ' + curScore + '!\nYour cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ',' + statsArr[2][1] + '\nTo play again, type ' + prefix + 'blackjack');
                        firebase.database().ref('blackjack').update({
                            [message.author.id] : null
                        });
                        return;
                    }
                    message.channel.send('You got 5 cards without busting!\nYour cards: ' + curCardString + '\nDealer cards: ' + statsArr[2][0] + ',' + statsArr[2][1] + '\nYour score: ' + curScore.toString() + '\nTo play again, type ' + prefix + 'blackjack');
                    firebase.database().ref('blackjack').update({
                        [message.author.id] : null
                    });
                    return;
                });
            });
        });
    });
    firebase.database().ref('blackjack').update({
        [message.author.id] : null
    });
}
module.exports.help = {
    name: 'blackjack',
    syntax: 'blackjack',
    usage: 'Starts a game of blackjack',
    perms: 'none'
}