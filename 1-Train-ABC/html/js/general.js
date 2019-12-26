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
	//Level 1 activity 
{carriages: [
	{index : 1, image: './images/capital-alphabet-train/engine.png'},
	{index : 2, image: './images/capital-alphabet-train/a.png'},
	{index : 3, image: './images/capital-alphabet-train/b.png'},
	{index : 4, image: './images/capital-alphabet-train/c.png'},
	{index : 5, image: './images/capital-alphabet-train/d.png'},
	{index : 6, image: './images/capital-alphabet-train/e.png'},
	{index : 7, image: './images/capital-alphabet-train/f.png'},
	{index : 8, image: './images/capital-alphabet-train/g.png'},
	{index : 9, image: './images/capital-alphabet-train/h.png'},
	{index : 10, image: './images/capital-alphabet-train/i.png'}
], remainingCards: [3, 4, 5, 6, 7, 8, 9, 10], carriagesLength: 10, level: 1},
	//Level 2 activity 
{carriages: [
	{index : 1, image: './images/capital-alphabet-train/engine.png'},
	{index : 2, image: './images/capital-alphabet-train/j.png'},
	{index : 3, image: './images/capital-alphabet-train/k.png'},
	{index : 4, image: './images/capital-alphabet-train/l.png'},
	{index : 5, image: './images/capital-alphabet-train/m.png'},
	{index : 6, image: './images/capital-alphabet-train/n.png'},
	{index : 7, image: './images/capital-alphabet-train/o.png'},
	{index : 8, image: './images/capital-alphabet-train/p.png'},
	{index : 9, image: './images/capital-alphabet-train/q.png'},
	{index : 10, image: './images/capital-alphabet-train/r.png'}
], remainingCards: [3, 4, 5, 6, 7, 8, 9, 10], carriagesLength: 10, level: 2},
	//Level 3 activity 
{carriages: [
	{index : 1, image: './images/capital-alphabet-train/engine.png'},
	{index : 2, image: './images/capital-alphabet-train/s.png'},
	{index : 3, image: './images/capital-alphabet-train/t.png'},
	{index : 4, image: './images/capital-alphabet-train/u.png'},
	{index : 5, image: './images/capital-alphabet-train/v.png'},
	{index : 6, image: './images/capital-alphabet-train/w.png'},
	{index : 7, image: './images/capital-alphabet-train/x.png'},
	{index : 8, image: './images/capital-alphabet-train/y.png'},
	{index : 9, image: './images/capital-alphabet-train/z.png'},
], remainingCards: [3, 4, 5, 6, 7, 8, 9], carriagesLength: 9, level: 3}
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
		equalHeights: function() {
			var top = 0;
			var row = [];
			var classname = ('equalHeights' + Math.random()).replace('.', '');
			$(this).each(function() {
				var thistop = $(this).offset().top;
				if (thistop > top) {
					$('.' + classname).removeClass(classname);
					top = thistop;
				}
				$(this).addClass(classname);
				$(this).height('auto');
				var h = (Math.max.apply(null, $('.' + classname).map(function() {
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
	$('<div>' + carriages[i-1].index + '</div>').data( 'number', carriages[i-1].index ).attr( 'id', 'card'+ carriages[i-1].index ).appendTo( '#cardPile' ).draggable( {
		containment: '#content',
		stack: '#cardPile div',
		cursor: 'move',
		revert: true
	});
	$('#card'+ carriages[i-1].index).css({'background-image' : 'url(' + carriages[i-1].image + ')'});
}

/* Function for generate slot */
function generateSlot(i) {
	$('<div> </div>').data( 'number', i ).attr( 'id', 'slot'+ i ).appendTo( '#cardSlots' ).droppable( {
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

function trainSound() {
	var trainWhistleSound = document.getElementById("trainSound");
	trainWhistleSound.load();
	trainWhistleSound.play();
}

function putCardCorrectPosition(card,slot) {
	card.addClass( 'correct' );
	card.draggable( 'disable' );
	slot.droppable( 'disable' );
	card.position( { of: slot, my: 'left top', at: 'left top' } );
	card.draggable( 'option', 'revert', false );
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
$(document).ready(function() {
	
	var backgroundSound = document.getElementById("backgroundSound");
	backgroundSound.load();
	backgroundSound.play();
	if(index == 0) {
		$("#cardSlots").addClass('activity_dash');
	}

	footerAdj();
	equalHeight();

	$("a[href='#']").click(function(e) {
		e.preventDefault();
	});

	/* On scroll small header */
	$(window).scroll(function(e) {
		if($(window).scrollTop() > 0)
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

	// info popup show-hide
	$(".infobtn").click(function(){
		$(".info-popup").addClass("show");
	});
	$(".close").click(function(){
		$(".info-popup").removeClass("show");
	});
	
});

function init() {

	$('#successMessage').removeClass("show");
	$('#nextActivity').removeClass("show");
	$("#content").show();
	$("#content #cardPile").removeClass('remove');

	// Reset the game
	correctCardsNumbers = [];

	correctCards = 0;
	$('#cardPile').html( '' );
	$('#cardSlots').html( '' );
	carriages = activities[index].carriages;
	remainingCards = numbers.slice();
	remainingCards = activities[index].remainingCards;
	remainingCardsSorted = remainingCards.slice();
	remainingCardsSorted.sort( function() { return Math.random() - .5 } );

	remainingCardsSorted.forEach(function (i) {
		generateCard(i);
	});
	// Create the card slots
	for ( var i=1; i<=carriages.length; i++ ) {
		generateSlot(i);
		if(!remainingCards.includes(i)){
			generateCard(i);
			putCardCorrectPosition($("#card"+i), $("#slot"+i));
		}
	}

}

function handleCardDrop( event, ui ) {
	var slotNumber = $(this).data( 'number' );
	var cardNumber = ui.draggable.data( 'number' );

	if ( slotNumber == cardNumber && remainingCards[0] == cardNumber) {
		putCardCorrectPosition(ui.draggable, $(this));
		if($.inArray(cardNumber, remainingCards) !== -1) {
			remainingCards.splice(0, 1)
		}

		if(correctCards != carriages.length)
		{
			currectCardSound();
		}
	} else {
		wrongCardSound();
		if(remainingCards[0] != cardNumber)
		{
			wrongAttempts++;
		}

		if(wrongAttempts === maxWrongAttempt)
		{
			wrongAttempts = 0;
			$('#card' + remainingCards[0]).addClass('card-highlighted');
			setTimeout(function(){ 
				$('#card' + remainingCards[0]).removeClass('card-highlighted');
			}, 1000);
		}
	}

	// If all the cards have been placed correctly then display a message
	// and reset the cards for another go
	if (correctCards == activities[index].carriagesLength) {
		trainSound();
		setTimeout(function () {
			$('#successMessage').addClass("show");
			$("#successMessage .level-text").html("Level - "+activities[index].level+" Completed");
			finishActivitySound();
		}, 8000);
		$("#content").hide("slide", { direction: "left" }, 10000, function () {
			$('#successMessage').removeClass("show");
			$('#nextActivity').addClass("show");
		});
		$("#content #cardPile").addClass('remove');
		if ($("#cardPile").find(".ui-draggable.correct")) {
			$("#cardPile .ui-draggable.correct").removeClass('ui-draggable');
		}
	}

}

function nextActivity(){
	if(index >= 0) {
		$("#cardSlots").removeClass('activity_dash');
	}
	if(index == 2){
		window.location.href = "activity2.html";
	}
	index++;
	init();
}

/* Window Resize */
$(window).resize(function() {
	footerAdj();
	equalHeight();
});