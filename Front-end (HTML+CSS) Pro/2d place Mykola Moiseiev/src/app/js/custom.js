var element = document.getElementById('search-field');
var header = document.getElementById('header');
var trigger = document.getElementById('js-show-search'); 

trigger.addEventListener('click', function(e) {
    e.preventDefault();
    element.classList.toggle('show-field');
    header.classList.toggle('show-search');
});

var trigger2 = document.getElementById('js-close-search');

trigger2.addEventListener('click', function(e) {
    e.preventDefault();
    element.classList.toggle('show-field');
    header.classList.toggle('show-search');
});


function openbox(id,tt) {
	var div = document.getElementById(id);
	var tt_div = document.getElementById(tt);
	if(div.style.display == 'block') {
	    div.style.display = 'none';
	    div.classList.toggle('open-popup');
	}
	else {
	    div.style.display = 'block';
	    div.classList.toggle('open-popup');
	}
}
