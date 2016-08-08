"use strict";
var Plugin = (function(){

	var $lightbox = $('#pluginLightbox');
	var $box = $('#pluginFrame');
	var $close = $('#pluginClose');
	var $menuList = $('.shopNav li');
	var $sizeList = $('li[data-pluginSize]');
	var $pluginButton = $('#pluginButton');
	var urlBase = 'http://localhost:8888/sizecheckr/client/';  // pointing to the service side
	var partnerSizes;

	var updateCloseBtnPosition = function(){
		if($box.is(':visible')){
			var boxPosition = $box.position();
			var newPos = boxPosition.left + $box.width() - $close.outerWidth(true);
			$close.css({'top': boxPosition.top, 'left': newPos});
		}
	};

	$close.on('click', function(e){
		e.preventDefault();
		$lightbox.fadeOut(400);
	});

	$lightbox.on('click', function(e){
		if($box.has(e.target).length == 0 && !$box.is(e.target)){
			$lightbox.fadeOut(400);
		}
	});

	$menuList.on('click', function(e){
		$menuList.removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$sizeList.on('click', function(e){
		$sizeList.removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	var getGenreSelected = function(){
		var size = "M";
		$menuList.each(function(){
			if($(this).hasClass('active')){
				size = $(this).data('plugingenre');
			};
		});
		return size;
	};

	var getSizeSelected = function(){
		var size = "S";
		partnerSizes = [];
		$sizeList.each(function(){
			partnerSizes.push($(this).data('pluginsize'));
			if($(this).hasClass('active')){
				size = $(this).data('pluginsize');
			};
		});
		return size;
	};

	$pluginButton.on('click', function(e){
		e.preventDefault();
		$close.hide();

		var xSize = getSizeSelected();
		var xGenre = getGenreSelected();
		var xProdu = ($(this).data('product')) ? $(this).data('product') : 'ROUPA QUALQUER';
		var url = urlBase + 'sizecheckr.html?g=' + xGenre + '&p=' + xProdu + '&s=' + xSize + '&t=' + partnerSizes;
		$box.attr('src', url);

		$lightbox.fadeIn(600, function(){
			updateCloseBtnPosition();
			$close.fadeIn(400)
		});
	});

	return {
        updateCloseBtnPosition: updateCloseBtnPosition
    };
})();

$(window).resize(function(){
	Plugin.updateCloseBtnPosition();
});
