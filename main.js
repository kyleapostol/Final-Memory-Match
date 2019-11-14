$(document).ready(initialize);

var cardArr = ["batman3.jpg", "captAmer.jpg", "deadpool.jpg", "flash.jpg", "aquaman.jpg",
             "iron_Man.jpg", "spiderman2.jpg", "superman3.jpg", "wolverine.jpg", "black_panther.jpg"];
             
var cardArrCopy = ["batman3.jpg", "captAmer.jpg", "deadpool.jpg", "flash.jpg", "aquaman.jpg",
"iron_Man.jpg", "spiderman2.jpg", "superman3.jpg", "wolverine.jpg", "black_panther.jpg"]; 

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
var extraBtnToggle = true;

function initialize(){
    createCards();
    $('.shuffle-btn').click(handleShuffleBtn);
    $('.reset-btn').click(handleReset);
    $('.toggle-btn').click(toggle);
    $('.play-btn').click(playAgainBtn);
    $('.toggle-btn').click(createAudio);
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
    $(".end-modal").addClass("hidden");
    $(".top-row").empty();
    $(".bottom-row").empty();
    createCards();
}

function handleReset() {
    if(extraBtnToggle) {
        avg = 0;
        matches = 0;
        $('span').text(avg);
        $('a').text(avg);
        $(".top-row").empty();
        $(".bottom-row").empty();    
        createCards();
        extraBtnToggle = false;
        appendCharacter("default-gif");
    }
}

function handleShuffleBtn(){
    if(extraBtnToggle) {
        $('a').text(gamesPlayed);
        $(".top-row").empty();
        $(".bottom-row").empty();
        createCards();
        extraBtnToggle = false;
        appendCharacter("default-gif");   
    }
}

function toggle(){
    $(".landing-modal").addClass("hidden");
}

function createAudio(){
    var audio = $("<audio autoplay></audio>").attr("src", "audio/untitled_327.mp3");
    $("body").append(audio);
}

function createCards() {
    shuffle(cardArr); 
    shuffle(cardArrCopy);
console.log(createSound);
    for(var i = 0; i < cardArr.length; i++){        
        var cardContainer =  $("<div></div>").addClass("card-container").click(handleCardClicked);
        var frontCard = $("<div></div>").addClass('front zoom').click(createSound);
        var backCard = $("<div></div>");

        $(backCard).css({"background-image": "url(../images/"  + cardArr[i] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px groove red", "flex-grow" : 1}).addClass("hidden");
   
        $(cardContainer).append(frontCard);
        $(cardContainer).append(backCard);
        $(".top-row").append(cardContainer);

        var cardContainer2 =  $("<div></div>").addClass("card-container").click(handleCardClicked);
        var frontCard2 = $("<div></div>").addClass('front zoom').click(createSound);
        var backCard2 = $("<div></div>");

        $(backCard2).css({"background-image": "url(../images/"  + cardArrCopy[i] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px groove red", "flex-grow" : 1}).addClass("hidden");
   
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
            card1 = $(event.currentTarget.childNodes[0]);
            flippedCard = $(event.currentTarget.childNodes[1]);
            return firstCardClicked;
        } else {
            secondCardClicked = event.currentTarget.innerHTML;   
            card2 = $(event.currentTarget.childNodes[0]);
            flippedCard2 = $(event.currentTarget.childNodes[1]);
            winCondition(firstCardClicked, secondCardClicked);
            firstCardClicked = null;
        }        
    }
}

function appendCharacter(cardName){
    $(".hero-container").addClass(cardName);
    setTimeout(() => {
        extraBtnToggle = true;
        $(".hero-container").removeClass(cardName);
    }, 2500);
};

function winCondition(firstCardClicked, secondCardClicked){
    isClicked = false;
    attempts++;
    if(firstCardClicked === secondCardClicked) {
        matches++;
        var endStr = firstCardClicked.search(".jpg");
        var startStr = firstCardClicked.search("/image");
        var cardName = firstCardClicked.substring((startStr + 8), endStr);
        appendCharacter(cardName);
        firstCardClicked, secondCardClicked = null;
        card1, card2 = null;
        isClicked = true;
        $('span').text(handleAverage());
        finishGame();
    } else {
        setTimeout(notMatching,1200);
    }
}

function notMatching() {
    $(card1).removeClass('hidden');
    $(card2).removeClass('hidden');
    $(flippedCard).addClass('hidden');
    $(flippedCard2).addClass('hidden');
    firstCardClicked, secondCardClicked = null;
    card1, card2 = null;
    isClicked = true;
}

function handleAverage(){
    avg = 100 * (matches / attempts);
    var accNum =avg.toFixed(1).toString();
    return accNum + '%';
}

function finishGame(){
    if(matches === 10) {
        gamesPlayed ++;
        $('a').text(gamesPlayed);
        var endModal = $("<div></div>").addClass('end-modal');
        var modalMessage = $("<div>You\'ve Won!</div>").addClass('modal-text');
        var modalBtn = $("<button type='button'></button>").addClass('play-btn').text("Play Again");
        $(modalBtn).click(playAgainBtn);
        $(endModal).append(modalMessage);
        $(endModal).append(modalBtn);
        $(".wrapper").append(endModal); 
    }
}
