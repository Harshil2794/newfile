var correctCards = 0;
var remainingCards = [];
var index = 0;
var commandLength;
var command = [];
var commandCorrect = 0;

var activities = [
// 1 activity
{command: [
	{index : 1, content : 'forward', image: './images/forward.svg'},
	{index : 2, content : 'forward', image: './images/forward.svg'},
	{index : 3, content : 'jump', image: './images/jump.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'jump', image: './images/jump.svg'},
	{index : 7, content : 'jump', image: './images/jump.svg'},
	{index : 8, content : 'jump', image: './images/jump.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8], commandLength: 4},
// // 2 activity
{command: [
	{index : 1, content : 'jump', image: './images/jump.svg'},
	{index : 2, content : 'jump', image: './images/jump.svg'},
	{index : 3, content : 'jump', image: './images/jump.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'forward', image: './images/forward.svg'},
	{index : 8, content : 'jump', image: './images/jump.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8], commandLength: 4},
// 3 activity
{command: [
	{index : 1, content : 'shrink', image: './images/shrink.svg'},	
	{index : 2, content : 'forward', image: './images/forward.svg'},
	{index : 3, content : 'forward', image: './images/forward.svg'},
	{index : 4, content : 'jump', image: './images/jump.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'shrink', image: './images/shrink.svg'},
	{index : 8, content : 'shrink', image: './images/shrink.svg'},
	{index : 9, content : 'shrink', image: './images/shrink.svg'},
	{index : 10, content : 'jump', image: './images/jump.svg'},
	{index : 11, content : 'jump', image: './images/jump.svg'},
	{index : 12, content : 'jump', image: './images/jump.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12], commandLength: 4},
// 4 activity
{command: [
	{index : 1, content : 'shrink', image: './images/shrink.svg'},
	{index : 2, content : 'shrink', image: './images/shrink.svg'},
	{index : 3, content : 'shrink', image: './images/shrink.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'forward', image: './images/forward.svg'},
	{index : 8, content : 'shrink', image: './images/shrink.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8], commandLength: 4},
/*5 activity*/
{command: [
	{index : 1, content : 'forward', image: './images/forward.svg'},
	{index : 2, content : 'jump', image: './images/jump.svg'},
	{index : 3, content : 'shrink', image: './images/shrink.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'jump', image: './images/jump.svg'},
	{index : 8, content : 'jump', image: './images/jump.svg'},
	{index : 9, content : 'shrink', image: './images/shrink.svg'},
	{index : 10, content : 'jump', image: './images/jump.svg'},
	{index : 11, content : 'shrink', image: './images/shrink.svg'},
	{index : 12, content : 'shrink', image: './images/shrink.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12], commandLength: 4},
// 6 activity
{command: [
	{index : 1, content : 'forward', image: './images/forward.svg'},
	{index : 2, content : 'jump', image: './images/jump.svg'},
	{index : 3, content : 'jump', image: './images/jump.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'jump', image: './images/jump.svg'},
	{index : 8, content : 'jump', image: './images/jump.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8], commandLength: 4},
// 7 activity
{command: [
	{index : 1, content : 'forward', image: './images/forward.svg'},
	{index : 2, content : 'shrink', image: './images/shrink.svg'},
	{index : 3, content : 'forward', image: './images/forward.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'shrink', image: './images/shrink.svg'},
	{index : 7, content : 'shrink', image: './images/shrink.svg'},
	{index : 8, content : 'shrink', image: './images/shrink.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8], commandLength: 4},
// 8 activity
{command: [
	{index : 1, content : 'jump', image: './images/jump.svg'},
	{index : 2, content : 'shrink', image: './images/shrink.svg'},
	{index : 3, content : 'forward', image: './images/forward.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'jump', image: './images/jump.svg'},
	{index : 8, content : 'jump', image: './images/jump.svg'},
	{index : 9, content : 'shrink', image: './images/shrink.svg'},
	{index : 10, content : 'jump', image: './images/jump.svg'},
	{index : 11, content : 'shrink', image: './images/shrink.svg'},
	{index : 12, content : 'shrink', image: './images/shrink.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12], commandLength: 4},
// 9 activity
{command: [
	{index : 1, content : 'forward', image: './images/forward.svg'},
	{index : 2, content : 'shrink', image: './images/shrink.svg'},
	{index : 3, content : 'forward', image: './images/forward.svg'},
	{index : 4, content : 'jump', image: './images/jump.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'jump', image: './images/jump.svg'},
	{index : 8, content : 'jump', image: './images/jump.svg'},
	{index : 9, content : 'shrink', image: './images/shrink.svg'},
	{index : 10, content : 'jump', image: './images/jump.svg'},
	{index : 11, content : 'shrink', image: './images/shrink.svg'},
	{index : 12, content : 'shrink', image: './images/shrink.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12], commandLength: 4},
// 10 activity
{command: [
	{index : 1, content : 'forward', image: './images/forward.svg'},
	{index : 2, content : 'jump', image: './images/jump.svg'},
	{index : 3, content : 'jump', image: './images/jump.svg'},
	{index : 4, content : 'forward', image: './images/forward.svg'},
	{index : 5, content : 'forward', image: './images/forward.svg'},
	{index : 6, content : 'forward', image: './images/forward.svg'},
	{index : 7, content : 'jump', image: './images/jump.svg'},
	{index : 8, content : 'jump', image: './images/jump.svg'},
	], remainingCards: [1, 2, 3, 4, 5, 6, 7, 8], commandLength: 4},
];

$(init);

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
	$('<div>' + command[i - 1].index + '</div>').data('number', command[i - 1].index).attr('id', 'card' + command[i - 1].index).appendTo('#cardPile').draggable({
		containment: '#content-id',
		stack: '#cardPile div',
		cursor: 'move',
		revert: true
	});
	$('#card' + command[i - 1].index).attr('content', command[i - 1].content);
	$('#card' + command[i - 1].index).css({ 'background-image': 'url(' + command[i - 1].image + ')' });
}

/* Function for generate slot */
function generateSlot(i) {
	$('<div> </div>').data('number', i).attr('id', 'slot' + i).appendTo('#cardSlots').attr('content', command[i - 1].content).appendTo('#cardSlots').droppable({
		accept: '#cardPile div',
		hoverClass: 'hovered',
		drop: handleCardDrop
	});
}

function forward() {
	// var jumpSound = document.getElementById("jumpSound");
	// jumpSound.load();
	// jumpSound.play();
}

function jump() {
	var jumpSound = document.getElementById("jumpSound");
	jumpSound.load();
	jumpSound.play();
}

function rocketFlySound() {
	var rocketFly = document.getElementById("rocketFly");
	rocketFly.load();
	rocketFly.play();
}

function shrink() {
	var danceSlowSound = document.getElementById("danceSlowSound");
	danceSlowSound.load();
	danceSlowSound.play();
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

function playPause() {
	var backgroundSound = document.getElementById("backgroundSound");
	var jumpSound = document.getElementById("jumpSound");
	var rocketFlySound = document.getElementById("rocketFly");
	var danceSlowSound = document.getElementById("danceSlowSound");
	danceSlowSound.load();
	rocketFlySound.load();
	jumpSound.load();
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

	displayOverlay();

	// Hide the success message
	$('#nextActivity').removeClass("show");

	// info popup show-hide
	$(".infobtn").click(function () {
		$(".info-popup").addClass("show");
	});
	$(".close").click(function () {
		$(".info-popup").removeClass("show");
	});
});
var astronautPos = $('.astronaut').position();
	posLeft = astronautPos.left;

function displayOverlay() {
	
	$("#content-id #cardPile .ui-draggable").each(function (i) {
		i = i+1;
		var contentClass = $("#content-id #cardPile .ui-draggable#card"+i).attr( 'content' );
		$(this).addClass(contentClass+"-image");
	});
}

function init() {

	$('#nextActivity').removeClass("show");
	$(".astronaut").fadeIn("slow");
	$(".stone-wrapper").fadeIn("fast");
	$(".play-popup, #cardSlots, #cardPile").show();
	$(".rocket").removeClass("fly");

	correctCards = 0;
	$('#cardPile').html('');
	$('#cardSlots').html('');
	command = activities[index].command;
	remainingCards = activities[index].remainingCards;
	remainingCardsSorted = remainingCards.slice();

	remainingCardsSorted.forEach(function (i) {
		generateCard(i);
	});

	// Create the card slots
	for (var i = 1; i <= activities[index].commandLength; i++) {
		generateSlot(i);
		var slotContent = $('#content-id #cardSlots div#slot'+i).attr('content');
		$("#stone"+i).addClass(slotContent + "-gif");
		if (!remainingCards.includes(i)) {
			generateCard(i);
			putCardCorrectPosition($("#card" + i), $("#slot" + i));
		}
	}
}

function handleCardDrop(event, ui) {
	var cardNumber = ui.draggable.attr('content');
	$( this ).attr("drop-content",cardNumber);
	putCardCorrectPosition(ui.draggable, $(this));

	if (correctCards == activities[index].commandLength) {
		// $('.play-popup button').one( "click", function() {
		$('.play-popup button').click(function () {
			$('#commandCount').val(0);
			var correctItem = 1;
			$('#content-id #cardSlots div').each(function () {
				var slotNumber = $(this).attr('content');
				var cardDropNumber = $(this).attr('drop-content');
				if (slotNumber == cardDropNumber) {
					if (correctItem == correctCards) {
						commandCorrect = (commandCorrect == 2) ? 0 : 1 ;
						$('#commandCount').val(commandCorrect);
					}
				} else {
					commandCorrect = 2;
					$('#commandCount').val(commandCorrect);
					if(cardDropNumber !== undefined){
						$(this).addClass("wrong");
					}
					setTimeout(function () {
						init();
						displayOverlay();
					},2000);
				}
				correctItem++;
			});

			var commandval = $('#commandCount').val();
			if (commandval == 1) {
				$('#content-id #cardPile div').each(function (rank, item) {
					setTimeout(function () {
						if(rank <= 3){
							var dragElement = $(item).attr('content');
							$(".astronaut").addClass(dragElement);
							eval(dragElement+"()");
							setTimeout(function () {
								var danceSlowSound = document.getElementById("danceSlowSound");
								danceSlowSound.pause();
								charLeft = $('.astronaut').position().left;
								charBottom = $('.astronaut').position().bottom;
								$('.astronaut').css({
									left: charLeft,
									top: charBottom
								})
								$('.astronaut').removeClass(dragElement);
								if (rank == (activities[index].commandLength - 1)) {
									$(".astronaut").addClass("pop-dance");
									$(".stone-wrapper").fadeOut("fast");
									$(".play-popup, #cardSlots, #cardPile").hide();
									setTimeout(function () {
										$(".astronaut").addClass("dance-move");
									}, 850);
									setTimeout(function () {
										$(".astronaut").fadeOut("fast");
										$(".rocket").addClass("fly");
										rocketFlySound();
									}, 1500);
									setTimeout(function () {
										$('.astronaut').css({
											left: posLeft,
										});
									}, 2200);
								}
							}, 1000)
						}
					}, rank * 1500);
				});
				setTimeout(function () {
					var rocketFlySound = document.getElementById("rocketFly");
					rocketFlySound.pause();
					$('#nextActivity').addClass("show");
				}, 8000);
			}
		});
	}
}

function nextActivity() {
	if (index == activities.length - 1) {
		$(".stone-wrapper").fadeOut("fast");
		$(".play-popup, #cardSlots, #cardPile").hide();
	} else {
		$('#commandCount').val(0);
		var rocketFlySound = document.getElementById("rocketFly");
		rocketFlySound.pause();

		for (var i = 1; i <= activities[index].commandLength; i++) {
			var slotContent = $('#content-id #cardSlots div#slot' + i).attr('content');
			$("#stone" + i).removeClass(slotContent + "-gif");
		}
		$(".astronaut").removeClass("dance-move");
		$(".astronaut").fadeIn("slow");
		$(".astronaut").removeClass("pop-dance");
		$(".stone-wrapper").fadeIn("fast");
		$(".play-popup, #cardSlots, #cardPile").show();
		$(".rocket").removeClass("fly");
		index++;
		init();
		displayOverlay();
	}
}

/* Window Resize */
$(window).resize(function () {
	footerAdj();
	equalHeight();
});