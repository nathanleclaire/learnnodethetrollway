var jsdom = require('jsdom');
var request = require('request');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/home/nathan/webdev/learnnodethetrollway/db/nodetroll.db');

var util = require('util');

// Way to have no class, Nate
var CHARACTERS = {
	Guard: 1
};

var user = 'theonewhoquestions';

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

String.prototype.stripDoubleQuotes = function() {
	return this.slice(1, this.length - 1);
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

		// var stmt = db.prepare('INSERT INTO saying VALUES (null, ?, ?)');

		$skyrim_quotes.each( function() {
			var $scopedElem = $(this);
			var content = $scopedElem.html().stripHTMLSpecialChars().stripDoubleQuotes();

			setTimeout(function() {
				// console.log( content );
			}, timer);

			// stmt.run( content, CHARACTERS['Guard'] );
			timer += interval;



		}); 
	});

request('http://www.reddit.com/user/' + user + '.json', function(error, response, body) {
	if (!error && response.statusCode === 200) {
		var redditInfo = JSON.parse(body);
		console.log( util.inspect(redditInfo, false, null) );
	}
});

