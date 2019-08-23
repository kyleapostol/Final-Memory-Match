var cardArr = ["batman3.jpg", "captAmer.jpg", "deadpool.jpg", "flash.jpg", "aquaman.jpg",
             "iron_Man.jpg", "spiderman2.jpg", "superman3.jpg", "wolverine.jpg"];
             
var cardArrCopy = ["batman3.jpg", "captAmer.jpg", "deadpool.jpg", "flash.jpg", "aquaman.jpg",
"iron_Man.jpg", "spiderman2.jpg", "superman3.jpg", "wolverine.jpg"]; 


var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var avg = 0;             
var duplicateCard = null;
var firstCardClicked = null;
var secondCardClicked = null;
var card1 = null;
var card2 = null;
var flippedCard, flippedCard2 = null;
var isClicked = true;

$(document).ready(initialize);
function initialize(){
    $('.main').ready(createCards);
    $('shuffle-btn').ready(handleShuffleBtn);
    $('reset-btn').ready(handleReset);
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function handleReset(){
    $(".reset-btn").click(()=>{
        avg = 0;
        console.log("avg", avg)
        $('span').text(avg);
        $('a').text(avg);
        shuffle(cardArr);
        $(".main").empty();
        createCards()
    });
}

function handleShuffleBtn(){
        $(".shuffle-btn").click(()=>{
            gamesPlayed ++;
            $('a').text(gamesPlayed);
            shuffle(cardArr);
            $(".main").empty();
            createCards()
            });
}

function addHeroSticker(){
    $(".hero-container").addClass("hero-image");
}

function createCards(){    
    shuffle(cardArr); 
    shuffle(cardArrCopy);
    // addHeroSticker();

    for(var i = 0; i < cardArr.length; i++){
        duplicateCard = i;

        var cardContainer = $("<div></div>").addClass("card-container card").click(handleCardClicked);
        var frontCard = $("<div></div>").addClass("front col-sm");
        var backCard = $("<div></div>").addClass("col-sm");

        $(backCard).css({"background-image": "url(../images/"  + cardArr[i] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px double #F23333"}).addClass("hidden");
        $(cardContainer).append(frontCard);
        $(cardContainer).append(backCard);
        $(".main").append(cardContainer);
        
        var cardContainer2 = $("<div></div>").addClass("card-container card").click(handleCardClicked);
        var frontCard2 = $("<div></div>").addClass("front col-sm");
        var backCard2 = $("<div></div>").addClass("col-sm");
        
        $(backCard2).css({"background-image": "url(../images/"  + cardArrCopy[duplicateCard] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px double #F23333"}).addClass("hidden");
//
        $(cardContainer2).append(frontCard2);
        $(cardContainer2).append(backCard2);
        $(".main").append(cardContainer2);
    }
}

function handleCardClicked(event){
    if(isClicked){
        $(event.currentTarget.childNodes[0]).addClass('hidden');
        frontCard = $(event.currentTarget.childNodes[1]).removeClass('hidden');
        $(frontCard).click(event=>{event.stopImmediatePropagation()});
        
        if(firstCardClicked === null) {
            firstCardClicked = event.currentTarget.innerHTML;            
            console.log("first card clicked: ", firstCardClicked);

            card1 = $(event.currentTarget.childNodes[0]);
            flippedCard = $(event.currentTarget.childNodes[1]);
            return firstCardClicked;
        } else {
            secondCardClicked = event.currentTarget.innerHTML;            
            console.log("second card clicked: ", secondCardClicked);

            card2 = $(event.currentTarget.childNodes[0]);
            flippedCard2 = $(event.currentTarget.childNodes[1]);
            winCondition(firstCardClicked, secondCardClicked);
            firstCardClicked = null;
        }        
    }
}

function appendCharacter(card){
    var endStr = card.search(".jpg");
    var heroGif = card.substring(104, endStr);

    switch(heroGif){
        case 'batman3':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("batman-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("batman-gif");
            }, 2000);
            break; 

        case 'captAmer':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("captainAmer-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("captainAmer-gif");
            }, 2000);
            break;       

        case 'deadpool':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("deadpool-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("deadpool-gif");
            }, 2000);
            break;

        case 'flash':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("flash-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("flash-gif");
            }, 2000);
            break;  

        case 'aquaman':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("aquaman-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("aquaman-gif");
            }, 2000);
            break;

        case 'iron_Man':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("ironman-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("ironman-gif");
            }, 2000);
            break;      

        case 'spiderman2':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("spiderman-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("spiderman-gif");
            }, 2000);
            break;    

        case 'superman3':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("superman-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("superman-gif");
            }, 2000);
            break;     

        case 'wolverine':
            console.log("sticker: ", heroGif);
            $(".hero-container").addClass("wolverine-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("wolverine-gif");
            }, 2000);
            break;

        default:
            console.log("default: ", heroGif);
            $(".hero-container").addClass("batman-gif");
            setTimeout(() => {
                $(".hero-container").removeClass("batman-gif");
            }, 2000); 
    }
};



function winCondition(firstCardClicked, secondCardClicked){
    isClicked = false;
    attempts++;
    if(firstCardClicked === secondCardClicked) {
        console.log("it matched")
        matches++;
        appendCharacter(firstCardClicked);
        firstCardClicked = null;
        secondCardClicked = null;
        card1 = null;
        card2 = null;
        isClicked = true;
        $('span').text(handleAverage());
        finishGame();
    } else {
        console.log("Did NOT match")
        setTimeout(notMatching,1000);
    }
}

function notMatching() {
    $(card1).removeClass('hidden');
    $(card2).removeClass('hidden');
    $(flippedCard).addClass('hidden');
    $(flippedCard2).addClass('hidden');
    firstCardClicked = null;
    secondCardClicked = null;
    card1 = null;
    card2 = null;
    isClicked = true;
}

function handleAverage(){
    avg = 100 * (matches / attempts);
    var accNum =avg.toFixed(1).toString();
    return accNum + '%';
}

function finishGame(){
    console.log("number of matches: ", matches);
    if(matches === 2){
        gamesPlayed ++;
        $('a').text(gamesPlayed);
    }
}