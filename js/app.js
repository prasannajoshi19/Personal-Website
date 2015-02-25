$(document).ready(function() {
	loading();
});
//in loading() function we dynamically load files needed in the application
function loading() {
	var fileArray = [
		['css/bootstrap.min.css', 'css'],
		['css/style.css', 'css'],
		['images/prasanna.png', 'img'],
		['images/facebook.png', 'img'],
		['images/gmail.png', 'img'],
		['images/linkedin.png', 'img'],
		['images/phone.png', 'img'],
		['images/skype.png', 'img'],
		['images/twitter.png', 'img']
	];
	var fileArrayLength = fileArray.length, i, fileobj;
	for(i = 0; i < fileArrayLength; i = i + 1) {
		fileObj = fileArray[i];
		loadFiles(fileObj[0], fileObj[1], i, function (index){
			if(index === fileArrayLength - 1) {
				$('.loading-container').remove();
				$('.wrapper').css('display', 'block');
				initialize();
			}
		});
	}
}
//daynamically loading files.
function loadFiles(fileName, fileType, index, callback) {
    if (fileType == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", fileName);
    } else if (fileType == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", fileName);
    } else if(fileType === 'img') {
    	var fileref = document.createElement("img");
    	fileref.setAttribute("src", fileName);
    }
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    if (callback != undefined) {
        fileref.onload = function() {
            callback(index);
        };
    }
}
//in initialize() function we keep a listner on scroll and resize events.
function initialize() {
	var hash = window.location.hash, eventObj;
	$('body').animate({
			scrollTop: 0
	}, 0);
	if(hash !== '') {
		eventObj = {
			target: 'a[href*=' + hash + ']'
		};
	} else {
		eventObj = {
			target: 'a[href*=' + 'about' + ']'
		};
	}
	tabClick(eventObj);
	tabClickListener();
	scrollSpy();
	$(window).scroll(function(){
		event.preventDefault();
		scrollListener();
	});
	$(window).resize(function(){
		event.preventDefault();
		scrollListener();
	});
	//on click of project buttons, a new window will be opened with applications.
	$('.stock-site').click(function(event){
		setNewLocation('http://www.prasannajoshi.in/stock');
	});
	$('.football-site').click(function(event){
		setNewLocation('http://www.prasannajoshi.in/football');
	});
}
//Using setNewLocation() new window will be opened.
function setNewLocation(url) {
    var win = window.open(url, '_blank');
    win.focus();
};
function tabClickListener() {
	$('a[href*=#]').click(function(event){
		event.preventDefault();
		tabClick(event);
	});
}
//In tabClick() function we check clicked tab and scroll the body to that location.
function tabClick(event) {
	var elem = $(event.target),
		targetDiv = $(elem.attr('href'));
	$('a[href*=#]').removeClass('active');
	elem.addClass('active');
	if (targetDiv.length) {
		$('body').animate({
			scrollTop: targetDiv.offset().top
		}, 500);
	}
}
function scrollSpy() {
	$('.navbar').on('activate.bs.scrollspy', function() {
		//window.location.hash = $('.nav .active a').attr('href');
	});
}
//scrollListener listens to scroll event.
function scrollListener() {
 	var scrollHeight = $('body').scrollTop(),
 		tabs = $('a[href*=#]'),
 		tabLength = tabs.length,
 		i, tabElement, targetDiv, targetTop, targetHeight, eventObj, targetTab;
	for(i = 0; i < tabLength; i = i + 1) {
		tabElement = tabs.eq(i);
		targetDiv = $(tabElement.attr('href')),
		targetTop = targetDiv.offset().top,
		targetHeight = targetDiv.height(),
		bodyHeight = $('body').height(),
		wrapperHeight = $('.wrapper').height();
		if(((scrollHeight + 100) > targetTop) || ((bodyHeight + scrollHeight + 10) > wrapperHeight)) {
			targetTab = tabElement;
		}
	}
	if(tabElement.attr('href') !== window.selectedTab) {
		$('a[href*=#]').removeClass('active');
		targetTab.addClass('active');
		window.selectedTab = targetTab;
	}
 }