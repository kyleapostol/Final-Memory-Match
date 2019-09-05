var cardArr = ["batman3.jpg", "captAmer.jpg", "deadpool.jpg", "flash.jpg", "aquaman.jpg",
             "iron_Man.jpg", "spiderman2.jpg", "superman3.jpg", "wolverine.jpg", "blackPanther.jpg"];
             
var cardArrCopy = ["batman3.jpg", "captAmer.jpg", "deadpool.jpg", "flash.jpg", "aquaman.jpg",
"iron_Man.jpg", "spiderman2.jpg", "superman3.jpg", "wolverine.jpg", "blackPanther.jpg"]; 

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
    createCards();
    $('.shuffle-btn').click(handleShuffleBtn);
    $('.reset-btn').click(handleReset);
    $('.toggle-btn').click(toggle);
    $('.play-btn').click(playAgainBtn);
};

function createSound() {
    var audioElement = $("<audio autoplay></audio>")
    var audioSource = $("<source>").attr("src", "audio/adriantnt_glass.mp3");
    var cardSound = $(audioElement).append(audioSource);
    $('.main').append(cardSound);
    setTimeout(() => { $(audioElement).remove()}, 500);
}

function shuffle(arr) {
    for (var i = arr.length-1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function playAgainBtn() {
    matches = 0;
    $(".endModal").addClass("hidden");
    $(".top-row").empty();
    $(".bottom-row").empty();
    createCards();
}

function handleReset(){
    avg = 0;
    matches = 0;
    $('span').text(avg);
    $('a').text(avg);
    $(".top-row").empty();
    $(".bottom-row").empty();    
    createCards();
}

function handleShuffleBtn(){
    gamesPlayed ++;
    $('a').text(gamesPlayed);
    $(".top-row").empty();
    $(".bottom-row").empty();
    createCards()
}

function toggle(){
    $(".landing-modal").addClass("hidden");
}

function createCards() {
    shuffle(cardArr); 
    shuffle(cardArrCopy);

    for(var i = 0; i < cardArr.length; i++){        
        var cardContainer =  $("<div></div>").addClass("card-container").click(handleCardClicked);
        var frontCard = $("<div></div>").addClass('front zoom').click(createSound);
        var backCard = $("<div></div>");

        $(backCard).css({"background-image": "url(../images/"  + cardArr[i] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px groove red", "flex-grow" : 1}).addClass("hidden");
//  
        $(cardContainer).append(frontCard);
        $(cardContainer).append(backCard);
        $(".top-row").append(cardContainer);

        var cardContainer2 =  $("<div></div>").addClass("card-container").click(handleCardClicked);
        var frontCard2 = $("<div></div>").addClass('front zoom').click(createSound);
        var backCard2 = $("<div></div>");

        $(backCard2).css({"background-image": "url(../images/"  + cardArrCopy[i] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px groove red", "flex-grow" : 1}).addClass("hidden");
// 
        $(cardContainer2).append(frontCard2);
        $(cardContainer2).append(backCard2);
        $(".bottom-row").append(cardContainer2);
    }
}

function handleCardClicked(event){
    if(isClicked){
        $(event.currentTarget.childNodes[0]).addClass('hidden');
        frontCard = $(event.currentTarget.childNodes[1]).removeClass('hidden');
        $(frontCard).click(event => {event.stopImmediatePropagation()});
        
        if( firstCardClicked === null ) {
            firstCardClicked = event.currentTarget.innerHTML;
            console.log("event: ", event); 
            console.log("firstCardClicked: ", firstCardClicked);
            card1 = $(event.currentTarget.childNodes[0]);
            flippedCard = $(event.currentTarget.childNodes[1]);
            return firstCardClicked;
        } else {
            secondCardClicked = event.currentTarget.innerHTML;   
            console.log("secondCardClicked: ", secondCardClicked);         
            card2 = $(event.currentTarget.childNodes[0]);
            flippedCard2 = $(event.currentTarget.childNodes[1]);
            winCondition(firstCardClicked, secondCardClicked);
            firstCardClicked = null;
        }        
    }
}

function handleCardClicked(event){
    if(isClicked){
        $(event.currentTarget.childNodes[0]).addClass('hidden');
        frontCard = $(event.currentTarget.childNodes[1]).removeClass('hidden');
        $(frontCard).click(event => {event.stopImmediatePropagation()});
        
        if( firstCardClicked === null ) {
            firstCardClicked = event.currentTarget.innerHTML; 
            console.log("firstCardClicked: ", firstCardClicked);
            card1 = $(event.currentTarget.childNodes[0]);
            flippedCard = $(event.currentTarget.childNodes[1]);
            return firstCardClicked;
        } else {
            secondCardClicked = event.currentTarget.innerHTML;   
            console.log("secondCardClicked: ", secondCardClicked);         
            card2 = $(event.currentTarget.childNodes[0]);
            flippedCard2 = $(event.currentTarget.childNodes[1]);
            winCondition(firstCardClicked, secondCardClicked);
            firstCardClicked = null;
        }        
    }
}

function appendCharacter(card){
    var endStr = card.search(".jpg");
    var heroGif = card.substring(96, endStr);
    console.log("heroGif: ", heroGif);
    $(".hero-container").addClass(heroGif);
    setTimeout(() => {
        $(".hero-container").removeClass(heroGif);
    }, 2000);
};
function winCondition(firstCardClicked, secondCardClicked){
    isClicked = false;
    attempts++;
    if(firstCardClicked === secondCardClicked) {
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
    if(matches === 1) {
        console.log("finishGame ran");
        gamesPlayed ++;
        $('a').text(gamesPlayed);
        var endModal = $("<div></div>").addClass('endModal');
        var modalMessage = $("<div>You\'ve Won!</div>").addClass('modal-text');
        var modalBtn = $("<button type='button'></button>").addClass('play-btn').text("Play Again");
        $(modalBtn).click(playAgainBtn);
        $(endModal).append(modalMessage);
        $(endModal).append(modalBtn);
        $(".wrapper").append(endModal); 
    }
}
// function createCards(){    
//     shuffle(cardArr); 
//     shuffle(cardArrCopy);

//     for(var i = 0; i < cardArr.length; i++){
//         duplicateCard = i;

//         var cardContainer = $("<div></div>").addClass("card-container card").click(handleCardClicked);
//         var frontCard = $("<div></div>").addClass("front zoom col-sm").click(createSound);
//         var backCard = $("<div></div>").addClass("col-sm");

//         $(backCard).css({"background-image": "url(../images/"  + cardArr[i] + ")", "background-size": "cover",
//         "background-position": "center", "border": "3px groove red"}).addClass("hidden");;

//         $(cardContainer).append(frontCard);
//         $(cardContainer).append(backCard);
//         $(".main").append(cardContainer);
    
//         var cardContainer2 = $("<div></div>").addClass("card-container card").click(handleCardClicked);
//         var frontCard2 = $("<div></div>").addClass("front zoom col-sm").click(createSound);
//         var backCard2 = $("<div></div>").addClass("col-sm");
        
//         $(backCard2).css({"background-image": "url(../images/"  + cardArrCopy[duplicateCard] + ")", "background-size": "cover",
//         "background-position": "center", "border": "3px groove red"}).addClass("hidden");;
       
//         $(cardContainer2).append(frontCard2);
//         $(cardContainer2).append(backCard2);
//         $(".main").append(cardContainer2);
//     }
// 
