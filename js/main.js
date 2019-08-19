var cardArr = ["batman.jpg", "captain_America.jpg", "deadpool.png", "flash.jpg", "green_lantern.png",
             "iron_Man.jpg", "spiderman.jpg", "superman.jpg", "wonder_woman.png"];
var duplicateCard = null;

$(document).ready(initialize);
function initialize(){
    $('.main').ready(createCards)
}

function createCards(){
    for(var i = 0; i < cardArr.length; i++){
        var card = $("<div></div>").addClass("card col-sm cover").click(handleCardClicked);
        $(card).css({"background-image": "url(../images/"  +cardArr[i] + ")", "background-size": "cover",
        "background-position": "center"});

        $(".main").append(card);
        duplicateCard = i;

        var card2 = $("<div></div>").addClass("card col-sm cover").click(handleCardClicked);
        $(card2).css({"background-image": "url(../images/"  +cardArr[duplicateCard] + ")", "background-size": "cover",
        "background-position": "center"});
        
        $(".main").append(card2);
    }
}

function handleCardClicked(event){
    console.log('event: ', event.currentTarget.outerHTML);
}
