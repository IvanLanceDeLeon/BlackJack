class Card{
    constructor(value,suit){
        this.value = value+1;
        this.suit = suit;
        this.data;
        switch(this.value){
            case 11:    this.data = suit + "j";
                        this.value=10;
                        break;
            case 12:    this.data = suit + "q";
                        this.value = 10;
                        break;
            case 13:    this.data = suit + "k";
                        this.value = 10;

                        break;
            default: this.data  = suit + (value+1);
        }
    }
    cardInfo(){
        console.log("Card value: " + this.value + "Card suit: " + this.suit);
    }
}

class Deck{
    constructor(){

    }
    deck = [];

    createDeck(){
        for(var i = 0; i <13; i++){
            var card = new Card(i,"s");
            
            this.deck.push(card);
        }
        for(var i = 0; i <13; i++){
            var card = new Card(i,"c");
            this.deck.push(card);
        }
        for(var i = 0; i <13; i++){
            var card = new Card(i,"h");
            this.deck.push(card);
        }
        for(var i = 0; i <13; i++){
            var card = new Card(i,"d");
            this.deck.push(card);
        }
    }
    
     shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  this.deck = array;
//   console.log(this.deck);
}

deal(player){
    if(player instanceof Player){
        var card = this.deck[this.deck.length-1];
        player.addToHand(card);
        $(".player").append("<img class = Deck src = cards/" + card.data + ".png>")

    }
        else if( player instanceof Dealer){
            var card = this.deck[this.deck.length-1];
            player.addToHand(card);
            $(".Dealer").append("<img class = Deck src = cards/" + card.data + ".png>")

        }
        player.handCount += card.value;
    this.deck.pop();
    
}

rem(player){

    if(player instanceof Player){
        player.discard(card);

    }
        else if( player instanceof Dealer){
            player.discard(card);

        }
        player.handCount -= card.value;
    this.deck.pop();
    



}

}

class Player{

    constructor(){
        this.hand = []
        this.handCount = 0;
    }

    addToHand(card){
        if(card instanceof Card){
            this.hand.push(card);
            // console.log(this.hand);
        }

    }
    discard(card){
        this.hand.splice(card,1);
        // console.log(this.hand);
    }
}

class Dealer{
    constructor(){
        this.hand = []
        this.handCount = 0;

    }

    addToHand(card){
        if(card instanceof Card){
            this.hand.push(card);
            // console.log(this.hand);
        }

    }
    discard(card){
        this.hand.splice(card,1);
        // console.log(this.hand);
    }

}

$(".Hit").hide();
$(".Stand").hide();
$(".Bet").hide();
$(".money").hide();
$('.chip').hide();

$(".start").click(function(){
    startGame()
    $('.chip').show();

    $(".menu").hide();
    $(".Hit").show();
    $(".Stand").show();
    $(".Bet").show();
    $(".money").show();

})


function startGame(){
var bet = 0;
var money = 1000
var pScore = 0;
var dScore = 0;
var newDeck = new Deck();
newDeck.createDeck();
newDeck.shuffle(newDeck.deck);
var player = new Player();
var dealer = new Dealer();
newDeck.deal(player);
newDeck.deal(player);
newDeck.deal(dealer);
newDeck.deal(dealer);
console.log(player.handCount);
console.log(dealer.handCount);          
dScore=dealer.handCount;
pScore=player.handCount;

$(".playerScore").text("Hand : " + pScore);
$(".money").text("$ " + money);
$(".dealerScore").text("Hand: " + dScore)


$(".Hit").click(function(){
    newDeck.deal(player);
    pScore=player.handCount;

    $(".playerScore").text("Hand : " + pScore);
    // console.log(pScore);
    if(pScore >=21){
        alert("You Lose.")
    } else if (pScore == 21){
        alert("You win")
        money += bet;
        $(".money").text("$ " + money);

    }
})

$(".Stand").click(function(){
    dScore=dealer.handCount;
    while(dScore <21){
        
        dScore=dealer.handCount;
        newDeck.deal(dealer);
        $(".dealerScore").text("Hand: " + dScore)

        if(dScore>21){
            alert("You Win!")
            money+=bet*2;
            $(".money").text("$ " + money);

            return;
        } else if (dScore > pScore){
            alert("You Lose")
            return;
        }
        else if (dScore ==21){
            alert("You Lose")
        }
    }

})

$(".chip.10").click(function(){
    console.log(newDeck.deck.length)
    $(".Deck").remove()
    while(dealer.hand.length != 0){
        dealer.discard();
    }

    while(player.hand.length!=0){
        player.discard();
    }
if(newDeck.deck.length <3){
    newDeck.createDeck();
}
player.handCount=0;
dealer.handCount=0;
money-=10;
bet=10;
newDeck.deal(player);
newDeck.deal(player);
newDeck.deal(dealer);
newDeck.deal(dealer);
$(".playerScore").text("Hand : " + player.handCount);
$(".dealerScore").text("Hand: " + dealer.handCount)
$(".money").text("$ " + money);
})

$(".chip.red").click(function(){
    console.log(newDeck.deck.length)
    $(".Deck").remove()
    while(dealer.hand.length != 0){
        dealer.discard();
    }

    while(player.hand.length!=0){
        player.discard();
    }
if(newDeck.deck.length <3){
    newDeck.createDeck();
}
player.handCount=0;
dealer.handCount=0;
money-=50;
bet=50;
newDeck.deal(player);
newDeck.deal(player);
newDeck.deal(dealer);
newDeck.deal(dealer);
$(".playerScore").text("Hand : " + player.handCount);
$(".dealerScore").text("Hand: " + dealer.handCount)
$(".money").text("$ " + money);
})


$(".chip.blue").click(function(){
    console.log(newDeck.deck.length)
    $(".Deck").remove()
    while(dealer.hand.length != 0){
        dealer.discard();
    }

    while(player.hand.length!=0){
        player.discard();
    }
if(newDeck.deck.length <3){
    newDeck.createDeck();
}
player.handCount=0;
dealer.handCount=0;
money-=100;
bet=100;
newDeck.deal(player);
newDeck.deal(player);
newDeck.deal(dealer);
newDeck.deal(dealer);
$(".playerScore").text("Hand : " + player.handCount);
$(".dealerScore").text("Hand: " + dealer.handCount)
$(".money").text("$ " + money);
})




}