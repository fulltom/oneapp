$(document).ready(function (){
	$('.hamburger').click(function() {
		if ($(window).width() < 700) {
			$("nav").slideToggle();
		}
	});

	$(window).resize(function() {
		if ($(window).width() > 700) {
			$("nav").show();
		}
	});
});