var jsdom = require('jsdom');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

/* consumes jQuery object
   returns jQuery object */
function stripTags($) {
		// Cleaning out anchor tags, italics, and one span which is a warning not
		// to edit for nice, readable quotes
		$('tr td a').contents().unwrap();
		$('tr td i').contents().unwrap();
		$('span').contents().unwrap();
		$('small').contents().unwrap();

		return $;
}

String.prototype.stripHTMLSpecialChars = function () {
		// There's a few quirks in the soup
		var str = this.replace(/&lt;/, '');
		str = str.replace(/&gt;/, '');
		str = str.replace(/&nbsp;\[sic\]/, 'y');

		return str;
}

jsdom.env('http://www.uesp.net/wiki/Skyrim:Guard', 
	[ 'http://code.jquery.com/jquery.min.js' ],
	function(errors, window) {
		var $ = window.$;
		var interval = 5;
		var timer = 0;

		$ = stripTags($);

		var $skyrim_quotes = $('tr td').filter( function(element, index, array) {
				if ( $(index).html().match(/^".*"$/) ) {
					return true;
				} else {
					return false;
				}
		});

		$skyrim_quotes.each( function() {
			var scopedElem = this;
			setTimeout(function() {
				console.log( $(scopedElem).html().stripHTMLSpecialChars().length );
			}, timer);
			timer += interval;

		}); 
	});

// 'http://www.reddit.com/user/theonewhoquestions.json'

var user = 'theonewhoquestions';