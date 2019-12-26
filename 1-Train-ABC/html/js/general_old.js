/*drag and drop js*/
var correctCards = 0;
var remainingCards = [];
var wrongAttempts = 0;
var maxWrongAttempt = 3;
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

/* Document Ready */
$(document).ready(function() {
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
	$('#successMessage').hide();
	$('#successMessage').css( {
			left: '50%',
			top: '50%',
			width: '250',
			height: '65',
			transform: 'translate(-50%, -50%)',
			opacity: 0,
	});
});

function init() {
	console.log("Init called!")

	$('#successMessage').hide();
	$("#content").show();

	// Reset the game
	correctCardsNumbers = [];

	correctCards = 0;
	$('#cardPile').html( '' );
	$('#cardSlots').html( '' );

	// Create the pile of shuffled cards
	var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	var carriages = [
		{index : 1, value:'A', image: './images/engine.png'},
		{index : 2, value:'B', image: './images/a.png'},
		{index : 3, value:'C', image: './images/b.png'},
		{index : 4, value:'D', image: './images/c.png'},
		{index : 5, value:'E', image: './images/d.png'},
		{index : 6, value:'F', image: './images/e.png'},
		{index : 7, value:'G', image: './images/f.png'},
		{index : 8, value:'H', image: './images/g.png'},
		{index : 9, value:'I', image: './images/h.png'},
		{index : 10, value:'J', image: './images/i.png'}
	];

	remainingCards = numbers.slice();
	numbers.sort( function() { return Math.random() - .5 } );

	numbers.forEach(function (i) {
		$('<div>' + carriages[i-1].index + '</div>').data( 'number', carriages[i-1].index ).attr( 'id', 'card'+ carriages[i-1].index ).appendTo( '#cardPile' ).draggable( {
			containment: '#content',
			stack: '#cardPile div',
			cursor: 'move',
			revert: true
		});
		$('#card'+ carriages[i-1].index).css({'background-image' : 'url(' + carriages[i-1].image + ')'})
	});

	// Create the card slots
	// var words = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];
	for ( var i=1; i<=numbers.length; i++ ) {
		$('<div> </div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
			accept: '#cardPile div',
			hoverClass: 'hovered',
			drop: handleCardDrop
		} );
	}

}

function handleCardDrop( event, ui ) {
	var slotNumber = $(this).data( 'number' );
	var cardNumber = ui.draggable.data( 'number' );

	// If the card was dropped to the correct slot,
	// change the card colour, position it directly
	// on top of the slot, and prevent it being dragged
	// again

	if ( slotNumber == cardNumber && remainingCards[0] == cardNumber) {
		ui.draggable.addClass( 'correct' );
		ui.draggable.draggable( 'disable' );
		$(this).droppable( 'disable' );
		ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
		ui.draggable.draggable( 'option', 'revert', false );
		correctCards++;
		wrongAttempts = 0;
		if($.inArray(cardNumber, remainingCards) !== -1) {
			remainingCards.splice(0, 1)
		}
	} else {

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

	if ( correctCards == 10 ) {
		
	 
		$('#successMessage').animate( {
			left: '50%',
			top: '50%',
			width: '250',
			height: '65',
			transform: 'translate(-50%, -50%)',
			opacity: 1
		} );
	
	//$("#cardSlots").hide("slide", { direction: "left" }, 10000);
 $("#content").hide("slide", { direction: "left" }, 10000, function() {
	$('#successMessage').show();
 });
 $("#cardPile").addClass('remove');
	}

}

/* Window Resize */
$(window).resize(function() {
	footerAdj();
	equalHeight();
});


/* Window Load */
/*$(window).on("load",function() {
	footerAdj();
	equalHeight();
});*/


