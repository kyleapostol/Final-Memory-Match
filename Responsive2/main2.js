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

};

function createCards() {
    for(var i = 0; i < cardArr.length; i++){
        duplicateCard = i;
        
        var cardContainer =  $("<div></div>").addClass("card-container");
        var frontCard = $("<div></div>").addClass('front');
        // var backCard = $("<div></div>");

        $(cardContainer).append(frontCard);
        // $(cardContainer).append(backCard);
        $(".top-row").append(cardContainer);
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
