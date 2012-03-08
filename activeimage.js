/**
*
*
**/
var ActiveImage = (function () {
	var origHeight = 0, origWidth = 0, zoom = 0, direction = 1, step = 0.01;

	function init(element, imagesrc, options) {
		var img = new Image();
		img.src = imagesrc;
		img.onload = function () {
			var divOuter = document.createElement('DIV');
			var divInner = document.createElement('DIV');
			origHeight = img.height;
			origWidth = img.width;
			zoom = options.zoom;
			options.width = origWidth * 0.8;
			options.height = origHeight * 0.6;

			outerStyle = [
				'width:' + options.width + 'px',
				'height:' + options.height + 'px',
				'overflow:' + 'hidden'
			];
			innerStyle = [
				'width:100%',
				'height:100%',
				'background-image :' + 'url(' + imagesrc + ')',
				'-webkit-transform:scale(' + zoom + ',' + zoom + ')'
			];

			divOuter.setAttribute('style', outerStyle.join(';'));
			divInner.setAttribute('style', innerStyle.join(';'));

			divOuter.appendChild(divInner);
			element.appendChild(divOuter);

			setInterval(function () {
				zoom += direction * step;
				if (zoom < 1) {
					direction = 1;
				} else if (zoom > 1.5) {
					direction = -1;
				}
				innerStyle = [
					'width:100%', 'height:100%',
					'background-image :' + 'url(' + imagesrc + ')',
					'-webkit-transform:scale(' + zoom + ',' + zoom + ')'
				];
				divInner.setAttribute('style', innerStyle.join(';'));
			}, 50);
		}
	}	

	function animate() {
	}

	return {
		init: init
	}
}());
var imgs = document.body.getElementsByTagName('IMG');
ActiveImage.init(document.body, imgs[0].src, { zoom:1.5 } );

