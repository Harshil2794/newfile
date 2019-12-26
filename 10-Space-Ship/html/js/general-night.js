var correctCards = 0;
var remainingCards = [];
var wrongAttempts = 0;
var maxWrongAttempt = 3;
var index = 0;
var carriagesLength;
// Create the pile of shuffled cards
var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var carriages = [];
var activities = [
	//Level 3 activity 
	{carriages: [
		{index : 1, image: './images/1.svg'},
		{index : 2, image: './images/2.svg'},
		{index : 3, image: './images/3.svg'},
		{index : 4, image: './images/4.svg'},
		{index : 5, image: './images/5.svg'},
		{index : 6, image: './images/6.svg'},
	], remainingCards: [2, 3, 6],carriagesLength: 6},
	//Level 4 activity 
	{carriages: [
		{index : 1, image: './images/6.svg'},
		{index : 2, image: './images/7.svg'},
		{index : 3, image: './images/8.svg'},
		{index : 4, image: './images/9.svg'},
		{index : 5, image: './images/10.svg'},
		{index : 6, image: './images/11.svg'},
		{index : 7, image: './images/12.svg'},
		{index : 8, image: './images/13.svg'},
	], remainingCards: [2, 4, 8],carriagesLength: 8},
	//Level 5 activity 
	{carriages: [
		{index : 1, image: './images/13.svg'},
		{index : 2, image: './images/14.svg'},
		{index : 3, image: './images/15.svg'},
		{index : 4, image: './images/16.svg'},
		{index : 5, image: './images/17.svg'},
		{index : 6, image: './images/18.svg'},
	], remainingCards: [3, 4, 6],carriagesLength: 6},
	// //Level 6 activity 
	{carriages: [
		{index : 1, image: './images/3.svg'},
		{index : 2, image: './images/4.svg'},
		{index : 3, image: './images/5.svg'},
		{index : 4, image: './images/6.svg'},
		{index : 5, image: './images/7.svg'},
		{index : 6, image: './images/8.svg'},
		{index : 7, image: './images/9.svg'},
		{index : 8, image: './images/10.svg'},
	], remainingCards: [2, 4, 6, 8],carriagesLength: 8},
	//Level 7 activity 
	{carriages: [
		{index : 1, image: './images/15.svg'},
		{index : 2, image: './images/16.svg'},
		{index : 3, image: './images/17.svg'},
		{index : 4, image: './images/18.svg'},
		{index : 5, image: './images/19.svg'},
		{index : 6, image: './images/20.svg'},
	], remainingCards: [2, 5],carriagesLength: 6},
	//Level 8 activity 
	{carriages: [
		{index : 1, image: './images/1.svg'},
		{index : 2, image: './images/2.svg'},
		{index : 3, image: './images/3.svg'},
		{index : 4, image: './images/4.svg'},
		{index : 5, image: './images/5.svg'},
		{index : 6, image: './images/6.svg'},
		{index : 7, image: './images/7.svg'},
		{index : 8, image: './images/8.svg'},
	], remainingCards: [2, 5, 8],carriagesLength: 8},
	//Level 9 activity 
	{carriages: [
		{index : 1, image: './images/12.svg'},
		{index : 2, image: './images/13.svg'},
		{index : 3, image: './images/14.svg'},
		{index : 4, image: './images/15.svg'},
		{index : 5, image: './images/16.svg'},
		{index : 6, image: './images/17.svg'},
		{index : 7, image: './images/18.svg'},
		{index : 8, image: './images/19.svg'},
	], remainingCards: [2, 4, 6, 8],carriagesLength: 8},
	//Level 10 activity 
	{carriages: [
		{index : 1, image: './images/5.svg'},
		{index : 2, image: './images/6.svg'},
		{index : 3, image: './images/7.svg'},
		{index : 4, image: './images/8.svg'},
		{index : 5, image: './images/9.svg'},
		{index : 6, image: './images/10.svg'},
		{index : 7, image: './images/11.svg'},
		{index : 8, image: './images/12.svg'},
	], remainingCards: [2, 4, 7],carriagesLength: 8},
]

$( init );

/* Footer will be sticky on the bottom of page */
function footerAdj() {
	var footerH = $("footer").outerHeight();
	$("footer").css({ "margin-top": -footerH });
	$(".wrapper").css({ "padding-bottom": footerH });
}

/* Equal Height */
function equalHeight() {
	$.fn.extend({
		equalHeights: function () {
			var top = 0;
			var row = [];
			var classname = ('equalHeights' + Math.random()).replace('.', '');
			$(this).each(function () {
				var thistop = $(this).offset().top;
				if (thistop > top) {
					$('.' + classname).removeClass(classname);
					top = thistop;
				}
				$(this).addClass(classname);
				$(this).height('auto');
				var h = (Math.max.apply(null, $('.' + classname).map(function () {
					return $(this).outerHeight();
				}).get()));
				$('.' + classname).height(h);
			}).removeClass(classname);
		}
	});
	$('.classname').equalHeights();
}

/* Function for generate card */
function generateCard(i) {
	$('<div>' + carriages[i - 1].index + '</div>').data('number', carriages[i - 1].index).attr('id', 'card' + carriages[i - 1].index).appendTo('#cardPile').draggable({
		containment: '#content',
		stack: '#cardPile div',
		cursor: 'move',
		revert: true
	});
	$('#card' + carriages[i - 1].index).css({ 'background-image': 'url(' + carriages[i - 1].image + ')' });
}

/* Function for generate slot */
function generateSlot(i) {
	$('<div> </div>').data('number', i).attr('id', 'slot' + i).appendTo('#cardSlots').droppable({
		accept: '#cardPile div',
		hoverClass: 'hovered',
		drop: handleCardDrop
	});
}

/* Use to play correct attempt card sound */
function currectCardSound() {
	var correctAttemptSound = document.getElementById("correctAttemptSound");
	correctAttemptSound.load();
	correctAttemptSound.play();
}

/* Use to play wrong attempt card sound */
function wrongCardSound() {
	var wrongAttemptSound = document.getElementById("wrongAttemptSound");
	wrongAttemptSound.load();
	wrongAttemptSound.play();
}

/* Use to play finish activity sound */
function finishActivitySound() {
	var completeActivitySound = document.getElementById("completeActivitySound");
	completeActivitySound.load();
	completeActivitySound.play();
}

function putCardCorrectPosition(card, slot) {
	card.addClass('correct');
	card.draggable('disable');
	slot.droppable('disable');
	card.position({ of: slot, my: 'left top', at: 'left top' });
	card.draggable('option', 'revert', false);
	correctCards++;
	wrongAttempts = 0;
}

function playPause(){
	var backgroundSound = document.getElementById("backgroundSound");
	var correctAttemptSound = document.getElementById("correctAttemptSound");
	var wrongAttemptSound = document.getElementById("wrongAttemptSound");
	var completeActivitySound = document.getElementById("completeActivitySound");
	completeActivitySound.load();
	wrongAttemptSound.load();
	correctAttemptSound.load();
	if (backgroundSound.paused && backgroundSound.currentTime >= 0 && !backgroundSound.ended) {
	   backgroundSound.play();
	   $("#soundbtn").removeClass("pausebtn");
	   $("#soundbtn").addClass("playbtn");
	} else {
	   backgroundSound.pause();
	   $("#soundbtn").removeClass("playbtn");
	   $("#soundbtn").addClass("pausebtn");
	}
}

/* Document Ready */
$(document).ready(function () {

	var backgroundSound = document.getElementById("backgroundSound");
	backgroundSound.load();
	backgroundSound.play();

	footerAdj();
	equalHeight();

	$("a[href='#']").click(function (e) {
		e.preventDefault();
	});

	/* On scroll small header */
	$(window).scroll(function (e) {
		if ($(window).scrollTop() > 0)
			$(".wrapper").addClass('small-header');
		else
			$(".wrapper").removeClass('small-header');
	});

	/* Placeholder */
	$("[placeholder]").each(function () {
		$(this).attr("data-placeholder", this.placeholder);

		$(this).bind("focus", function () {
			this.placeholder = '';
		});
		$(this).bind("blur", function () {
			this.placeholder = $(this).attr("data-placeholder");
		});
	});

	// Hide the success message
	$('#successMessage').removeClass("show");
	$('#nextActivity').removeClass("show");
});

function init() {

	$('#successMessage').removeClass("show");
	$('#nextActivity').removeClass("show");
	$("#content").show();
	$("#content").removeClass("plane-animation");
	$("#content #cardPile").removeClass('remove');

	// Reset the game
	correctCardsNumbers = [];
	correctCards = 0;
	$('#cardPile').html('');
	$('#cardSlots').html('');
	carriages = activities[index].carriages;
	remainingCards = numbers.slice();
	remainingCards = activities[index].remainingCards;
	remainingCardsSorted = remainingCards.slice();
	remainingCardsSorted.sort(function () { return Math.random() - .5 });
	remainingCardsSorted.forEach(function (i) {
		generateCard(i);
	});
	// Create the card slots
	for (var i = 1; i <= carriages.length; i++) {
		generateSlot(i);
		if (!remainingCards.includes(i)) {
			generateCard(i);
			putCardCorrectPosition($("#card" + i), $("#slot" + i));
		}
	}

}

function handleCardDrop(event, ui) {
	var slotNumber = $(this).data('number');
	var cardNumber = ui.draggable.data('number');

	if (slotNumber == cardNumber && remainingCards[0] == cardNumber) {
		putCardCorrectPosition(ui.draggable, $(this));
		if ($.inArray(cardNumber, remainingCards) !== -1) {
			remainingCards.splice(0, 1)
		}

		if (correctCards != carriages.length) {
			currectCardSound();
		}
	} else {
		wrongCardSound();
		if (remainingCards[0] != cardNumber) {
			wrongAttempts++;
		}

		if (wrongAttempts === maxWrongAttempt) {
			wrongAttempts = 0;
			$('#card' + remainingCards[0]).addClass('card-highlighted');
			setTimeout(function () {
				$('#card' + remainingCards[0]).removeClass('card-highlighted');
			}, 1000);
		}
	}

	// If all the cards have been placed correctly then display a message
	// and reset the cards for another go
	if (correctCards == activities[index].carriagesLength) {
		finishActivitySound();
		$("#content").addClass("plane-animation");
		setTimeout(function () {
			$('#successMessage').addClass("show");
		},8000);
		$("#content").addClass("plane-animation");
		setTimeout(function () {
			$('#content').hide();
			$('#successMessage').removeClass("show");
			$('#nextActivity').addClass("show");
		}, 10000);
		$("#cardPile").addClass('remove');
		if($("#cardPile").find(".ui-draggable.correct")){
			$("#cardPile .ui-draggable.correct").removeClass('ui-draggable');
		}
	}

}
function nextActivity() {
	if (index != activities.length-1) {
	 console.log("here");
	 index++;
	 init();
	} else{
		console.log("hekllo",activities.length-1,index);

	}

}
/* Window Resize */
$(window).resize(function () {
	footerAdj();
	equalHeight();
});