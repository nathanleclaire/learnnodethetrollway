var request = require('request');
var connect = require('connect');
var jsdom = require('jsdom');
var htmlparser = require('htmlparser');

jsdom.env('http://www.uesp.net/wiki/Skyrim:Guard', 
	[ 'http://code.jquery.com/jquery.min.js' ],
	function(errors, window) {
		var $ = window.$;
		var interval = 500;
		var timer = 0;

		var $skyrim_quotes = $('tr td').filter( function(element, index, array) {
				if ( $(index).html().match(/".*"/) ) {
					return true;
				} else {
					return false;
				}
		});

		$skyrim_quotes.each( function() {
			var scopedElem = this;
			setTimeout(function() {
				console.log( $(scopedElem).html() );
			}, timer);
			timer += interval;

		}); 
	});

// 'http://www.reddit.com/user/theonewhoquestions.json'

var user = 'theonewhoquestions';

var app = connect()
	.use(connect.logger('dev'))
	.use(connect.bodyParser())
	.use(connect.static('public'))
	.use(function(req, res) {
		res.end('hello world\n');
	}).listen(3000);
