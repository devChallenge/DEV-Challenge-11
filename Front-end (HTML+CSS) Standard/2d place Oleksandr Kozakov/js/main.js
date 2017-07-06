;
(function ($) {


	$(document).ready(function () {


		//Make elements equal height
		$('.matchHeight').matchHeight();

		$('.hamburger_icon').click(function(){
			$(this).toggleClass('active_icon');
			$('.header__menu').slideToggle(300);
		});

	// scrool to ID block
		$('.header__menu a[href*="#"]').click(function(event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 1500);
		});





		$('.banner__slider').slick({
			arrows: false,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			slide: '.banner__slide',
		});

		$('.banner__slider--nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.banner__slider',
			dots: false,
			arrows: false,
			centerMode: false,
			focusOnSelect: true,
			responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1
				}
			}
			]
		});

		$('.banner__slide').each(function(){
			var color = $(this).data('color');
			var text = $(this).find('.banner_change_color span');
			var banner_link = $(this).find('.banner--link');
				text.css('background', color);
				banner_link.css({"color": color, "border-color": color});

				banner_link.hover(function(){
					$(this).css({"background": color, "color": '#fff'});
				},function(){
					$(this).css({"background": 'transparent', "color": color});
				});

		});


		$('.banner__navblock').each(function(){
			var color = $(this).data('color');
			var text = $(this).find('.banner_change_color');
			var dott = $(this).find('.dott');
			if($(this).hasClass('slick-current')){
				text.css('color', color);
				dott.css({"background": color, "border-color": color});
			}
		});


		$('.banner__slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

			$('.banner__navblock').each(function(){
				var color = $(this).data('color');
				var text = $(this).find('.banner_change_color');
				var dott = $(this).find('.dott');
				if($(this).hasClass('slick-current')){
					text.css('color', color);
					dott.css({"background": color, "border-color": color});
				}
				else{
					text.css('color', '#252525');
					dott.css({"background": "#000", "border-color": "#000"});
				}
			});




		});


			// text.hover(function(){
			// 	$(this).css('color', color);
			// },function(){
			// 	$(this).css('color', '#000');
			// });



		$('.recent_markets--grid').slick({
			arrows: false,
			dots: false,
			infinite: true,
			speed: 500,
			autoplay: false,
			autoplaySpeed: 5000,
			slidesToShow: 3,
			slidesToScroll: 1,
			slide: '.grid__item',
			responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1
				}
			}
			]
		});



		$('.photo_slider').slick({
			arrows: false,
			dots: false,
			infinite: true,
			speed: 500,
			autoplay: false,
			autoplaySpeed: 5000,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			// variableWidth: true,
			centerPadding: '100px',
			slide: '.photo__slide',
			responsive: [
			{
				breakpoint: 767,
				settings: {
					centerPadding: '80px',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 640,
				settings: {
					centerPadding: '60px',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					centerPadding: '40px',
					slidesToShow: 1
				}
			}
			]
		});

	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 300) {
		}
		else{
		}
	});


}(jQuery));
