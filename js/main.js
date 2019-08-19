var cardArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

$(document).ready(initialize);

function initialize(){
$('.main').ready(createCards);
}

function createCards(){
    for(var i = 0; i < cardArr.length; i++){
        var card = $("<div></div>").addClass("card col-sm").text(cardArr[i]);
        $(".main").append(card);
    }
}