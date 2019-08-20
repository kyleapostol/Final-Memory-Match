var cardArr = ["batman.jpg", "captain_America.jpg", "deadpool.png", "flash.jpg", "green_lantern.png",
             "iron_Man.jpg", "spiderman.jpg", "superman.jpg", "wonder_woman.png"];
             
var matches = 0;
var attempts = 0;
var avg = 0;             
var duplicateCard = null;
var firstCardClicked = null;
var secondCardClicked = null;

$(document).ready(initialize);
function initialize(){
    $('.main').ready(createCards)
}

function createCards(){
    for(var i = 0; i < cardArr.length; i++){
        duplicateCard = i;

        var cardContainer = $("<div></div>").addClass("card-container card");
        var frontCard = $("<div></div>").addClass("front col-sm");
        var backCard = $("<div></div>").addClass("col-sm");

        $(backCard).css({"background-image": "url(../images/"  + cardArr[i] + ")", "background-size": "cover",
        "background-position": "center"});

        $(cardContainer).append(frontCard);
        $(cardContainer).append(backCard);
        $(".main").append(cardContainer);

        var cardContainer2 = $("<div></div>").addClass("card-container card");
        var frontCard2 = $("<div></div>").addClass("front col-sm");
        var backCard2 = $("<div></div>").addClass("col-sm");
        
        $(backCard2).css({"background-image": "url(../images/"  +cardArr[duplicateCard] + ")", "background-size": "cover",
        "background-position": "center"}); 

        $(cardContainer2).append(frontCard2);
        $(cardContainer2).append(backCard2);
        $(".main").append(cardContainer2);
    }
}

function handleCardClicked(event){
    console.log('event: ', event.currentTarget);
    // $(event.currentTarget).remove();
    if(firstCardClicked === null) {
        firstCardClicked = $(event.currentTarget).parent().prevObject[0].outerHTML;
        console.log("firstCardClicked: ", firstCardClicked);
    } else {
        console.log('this ran');
        secondCardClicked = $(event.currentTarget).parent().prevObject[0].outerHTML;
        console.log("secondCardClicked: ", secondCardClicked);
    }
}
