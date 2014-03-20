var request = require('request');
var cheerio = require('cheerio');
var URI = require('url');
var exec = require('child_process').exec;

(function() {
	// var host = 'http://www.trackmaven.com';
	if(process.argv[2] === undefined) {
		console.log('You need to pass in a URL as an argument \n Example: node head-scrape.js http://www.google.com')
	}
	var host = process.argv[2];

    var externalLinkCheck = new RegExp('^http');

    request(host, function(err, resp, body) {
    	$ = cheerio.load(body);
        //if the DOM doesn't have an HTML tag, length of cheerio obj will be 0
        if( $('html').length !== 0 ) {
            var css = $('html').find('link[rel="stylesheet"]');
        } else {
            var css = $('head').find('link[rel="stylesheet"]');
        }

    	for(var i=0; i<css.length; i++) {
            if (css[i].attribs.href.toString().match(externalLinkCheck) ) {
                console.log('CSS files available at ' + css[i].attribs.href);
            }
    		else{ console.log('CSS files available at ' + host + css[i].attribs.href); }
    	}
    })
}());