var cardArr = ["batman.jpg", "captain_America.jpg", "deadpool.png", "flash.jpg", "green_lantern.png",
             "iron_Man.jpg", "spiderman.jpg", "superman.jpg", "wonder_woman.png"];
             
var cardArrCopy = ["batman.jpg", "captain_America.jpg", "deadpool.png", "flash.jpg", "green_lantern.png",
"iron_Man.jpg", "spiderman.jpg", "superman.jpg", "wonder_woman.png"]; 

var matches = 0;
var attempts = 0;
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
    $('shuffle-btn').ready(handleBtnClicks);
}

function shuffle(arr) {
    console.log("shuffle function ran")
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function handleBtnClicks(){
    console.log("this handleBtnClicks function ran");
        $(".shuffle-btn").click(()=>{
            shuffle(cardArr),
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
    addHeroSticker();
    $(".hero-container").css({"background-image":"url('../images')"})
    for(var i = 0; i < cardArr.length; i++){
        duplicateCard = i;

        var cardContainer = $("<div></div>").addClass("card-container card").click(handleCardClicked);
        var frontCard = $("<div></div>").addClass("front col-sm");
        var backCard = $("<div></div>").addClass("col-sm");

        $(backCard).css({"background-image": "url(../images/"  + cardArr[i] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px double #F23333"});
// .addClass("hidden")
        $(cardContainer).append(frontCard);
        $(cardContainer).append(backCard);
        $(".main").append(cardContainer);
        
        var cardContainer2 = $("<div></div>").addClass("card-container card").click(handleCardClicked);
        var frontCard2 = $("<div></div>").addClass("front col-sm");
        var backCard2 = $("<div></div>").addClass("col-sm");
        
        $(backCard2).css({"background-image": "url(../images/"  + cardArrCopy[duplicateCard] + ")", "background-size": "cover",
        "background-position": "center", "border": "3px double #F23333"}); 
// .addClass("hidden")
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

function winCondition(firstCardClicked, secondCardClicked){
    isClicked = false;
    attempts++;
    if(firstCardClicked === secondCardClicked) {
        console.log("it matched")
        matches++;
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
    if(matches === 9){
    $('.section1').append('<span class="modal">You\'ve Won!</span>');
    }
}