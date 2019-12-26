//Prevent Page Reload on all # links
$("a[href='#']").click(function(e) {
	e.preventDefault();
});


/* accordian with add-remove class */

$("h5").click(function(){
		$this=$(this).closest(".outer-content");
		if($this.hasClass("active")){
		$this.removeClass("active");
		$this.find(".content").slideUp();
	} else {
		$this.addClass("active");
		$this.find(".content").slideDown();
		$this.siblings().removeClass("active").find(".content").slideUp();
	}
});


/* only accordian */

$("h5").click(function(){
	$this=$(this).closest(".outer-content");
	$this.find(".content").slideToggle();
	$this.siblings().find(".content").slideUp();
});


/* easy responsive tab */
$('.horizontalTab').easyResponsiveTabs({
	type: 'default',           
	width: 'auto',
	fit: true,   
	closed: 'accordion', 
	activate: function(event) { 
	var $tab = $(this);
	var $info = $('#tabInfo');
	var $name = $('span', $info);
	$name.text($tab.text());
	$info.show();
	}
});


/* hambourger menu */
$(".hamburger").click(function(){
	if($('body').hasClass("open-menu")){
		$('body').removeClass("open-menu")
	}else{
		$('body').addClass("open-menu")
	}
});


/* small-header */

/*Desktop device small header*/
if($(window).width() >= 768){	
	/*On scroll header small*/
	$(window).scroll(function(e) {
		if($(window).scrollTop() > 0){
			$("body").addClass('small-header');
		}else{
			$("body").removeClass('small-header');
		}
	});
}



/* one page smooth scroll start */
    $('a[href*="#"]:not([href="#"])').click(function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    var sections = $('section'),
    nav = $('.header-nav'),
    nav_height = nav.outerHeight();

    var cur_pos = $(this).scrollTop();

    sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });

    $(window).on('scroll', function() {
        var cur_pos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });
    /* one page smooth scroll end */


/*mcustom scrollbar*/ 

(function($){
	$(window).on("load",function(){

		$(".scrollbar-content").mCustomScrollbar({theme:"minimal"});
				//jQuery(".menu-fixed, .chat-description").mCustomScrollbar({axis: "y",theme:"dark-3"});
			});
})($);




/* fix footer */
// Footer Adj
function footerAdj(){
	var footerH = $("footer").innerHeight();
	$("footer").css({"margin-top": -footerH});
	$(".wrapper").css({"padding-bottom": footerH});
}


/* settimeout */
setTimeout(function(){
	$("img").css({opacity:1});
	$.fancybox.reposition();
},3000);


// equalHeight  Start
function equalHeight() {
    $.fn.extend({
        equalHeights: function() {
            var top = 0;
            var row = [];
            var classname = ("equalHeights" + Math.random()).replace(".", "");
            $(this)
                .each(function() {
                    var thistop = $(this).offset().top;
                    if (thistop > top) {
                        $("." + classname).removeClass(classname);
                        top = thistop;
                    }
                    $(this).addClass(classname);
                    $(this).height("auto");
                    var h = Math.max.apply(
                        null,
                        $("." + classname)
                        .map(function() {
                            return $(this).outerHeight();
                        })
                        .get()
                    );
                    $("." + classname).outerHeight(h);
                })
                .removeClass(classname);
        }
    });
    $(".inner-offers .title-content").equalHeights();
}
// equalHeight  End