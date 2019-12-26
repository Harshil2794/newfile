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

		// Hide the success message
	$('#successMessage').removeClass("show");
	$('#nextActivity').removeClass("show");

	// Astronaut Jump JS
	var upId = $('.up-arrow').attr('data-target');
    var rightId = $('.right-arrow').attr('data-target');
    var downId = $('.down-arrow').attr('data-target');

    var flyRocket = function() {
        if($('.draggable-block').children().length == 0) {
            $('.spaceship-image').addClass('fly');
            // $('.spaceship-image').children('img').delay(1800).attr('src', 'images/rocket-gif.gif');
            $('.astronaut-image').fadeOut('fast');
            $('.stone-wrapper').fadeOut('fast');
             
        }
    }
    var manPos = function() {
        charLeft = $('.astronaut-image').position().left;
        charTop = $('.astronaut-image').position().top;
        $('.astronaut-image').css({
            left: charLeft,
            top: charTop
        })
        ui.draggable.attr('id', '');
        $('.astronaut-image').removeClass('upArrow').addClass('astronaut-image');
    }
    $( "#up-draggable" ).draggable({
        // appendTo: '#up-droppable',
        revert: "invalid"
        // helper:'clone'
    });
    $( "#up-droppable" ).droppable({
        accept: "#up-draggable",
        drop: function( event, ui ) {
            $('.astronaut-image').addClass(upId);
            ui.draggable.appendTo($('#up-droppable'));
            setTimeout(function() {
                charLeft = $('.astronaut-image').position().left;
                charTop = $('.astronaut-image').position().top;
                $('.astronaut-image').css({
                    left: charLeft,
                    top: charTop
                })
                ui.draggable.attr('id', '');
                $('.astronaut-image').removeClass('upArrow').addClass('astronaut-image');
            }, 1200);
            // setTimeout(manPos, 1200);
            setTimeout(flyRocket, 1000);
        }
    });
    $( "#right-draggable" ).draggable({
        revert: "invalid",
    });
    $( "#right-droppable" ).droppable({
        accept: "#right-draggable",

        drop: function( event, ui ) {
            ui.draggable.appendTo($('#right-droppable'))
            $('.astronaut-image').addClass(rightId);
            setTimeout(function() {
                charLeft = $('.astronaut-image').position().left;
                charTop = $('.astronaut-image').position().top;
                $('.astronaut-image').css({
                    left: charLeft,
                    top: charTop
                });
                ui.draggable.attr('id', '');
                $('.astronaut-image').removeClass('rightArrow').addClass('astronaut-image');
            }, 1200);
            // setTimeout(manPos, 1200);
            setTimeout(flyRocket, 1000);
        }
    });
    $( "#down-draggable" ).draggable({
        revert: "invalid",
    });
    $( "#down-droppable" ).droppable({
        accept: "#down-draggable",
        drop: function( event, ui ) {
            ui.draggable.appendTo($('#down-droppable'))
            $('.astronaut-image').addClass(downId);
            setTimeout(function() {
                charLeft = $('.astronaut-image').position().left;
                charTop = $('.astronaut-image').position().top;
                $('.astronaut-image').css({
                    left: charLeft,
                    top: charTop
                })
                ui.draggable.attr('id', '');
                $('.astronaut-image').removeClass('downArrow').addClass('astronaut-image');
            }, 1400);
            // setTimeout(manPos, 1400);
            setTimeout(flyRocket, 1200);
        },
    });

});

function nextActivity() {
}
/* Window Resize */
$(window).resize(function () {
	footerAdj();
	equalHeight();
});