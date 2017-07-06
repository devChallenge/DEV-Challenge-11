$(function(){

//mobile menu functionality
	$('.mobile-menu').click(function() {
		$('.menu').slideToggle();
	});
	if ($(window).width() < 1024){
		$('.menu a').click(function() {
			$('.menu').slideUp();
		});
	}


//ВИБІР МІСТА У ШАПЦІ
	$('#city').focus(function() { $('#city-list').fadeIn();});
	$('#city').focusout(function() {$('#city-list').fadeOut();});
	$('#city-list a').click(function() {
		var city = $(this).text();
		$('#city').val(city);
	});


//SLIDER
	$('#main-slider').owlCarousel({
		loop:false,
		autoplay:false,
		dots: false,
		nav: false,
		mouseDrag:false,
		touchDrag:false,
		items:1
	});


//SLIDER NAVIGATION view
			var $frame1 = $('#navigation');
			var $slide1 = $frame1.children('ul').eq(0);
			var $wrap1 = $frame1.parent();
			$frame1.sly({
				horizontal: 1,
				itemNav: 'basic',
				activateOn:'click',
				mouseDragging: true,
				touchDragging: true,
				releaseSwing: true,
				startAt: 0,
				scrollBy: 0,
				speed: 300,
				elasticBounds: true,
				dragHandle: true,
				dynamicHandle: true,
				clickBar: true,
			});

//navigation functionality
			$('#nav1').click(function(){$('#main-slider').trigger('to.owl.carousel', 0)});
			$('#nav2').click(function(){$('#main-slider').trigger('to.owl.carousel', 1)});
			$('#nav3').click(function(){$('#main-slider').trigger('to.owl.carousel', 2)});
			$('#nav4').click(function(){$('#main-slider').trigger('to.owl.carousel', 3)});


 
			//RECENT MARKETS view
						var $frame2 = $('#market');
						var $slide2 = $frame2.children('ul').eq(0);
						var $wrap2 = $frame2.parent();
						$frame2.sly({
							horizontal: 1,
							itemNav: 'centered',
							activateOn:'click',
							mouseDragging: true,
							touchDragging: true,
							releaseSwing: true,
							startAt: 0,
							scrollBy: 0,
							speed: 300,
							elasticBounds: true,
							dragHandle: true,
							dynamicHandle: true,
							clickBar: true,
						});

//animation on scroll
	var $animation_elements = $('.animation-element');
	var $window = $(window);

	function check_if_in_view() {
		var window_height = $window.height();
		var window_top_position = $window.scrollTop();
		var window_bottom_position = (window_top_position + window_height);

		$.each($animation_elements, function() {
			var $element = $(this);
			var element_height = $element.outerHeight();
			var element_top_position = $element.offset().top;
			var element_bottom_position = (element_top_position + element_height);

			//check to see if this current container is within viewport
			if ((element_top_position <= window_bottom_position)) {
				$element.addClass('in-view');
			} else {
				$element.removeClass('in-view');
			}
		});
	}
	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');



});
