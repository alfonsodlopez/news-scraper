/*Dependencies*/
const cheerio = require('cheerio');
const request = require('request');
const Scrape = require('../models/Scrape.js');

/*Site to scrape*/
let site = 'http://www.morningstar.com/'

/*Function to get items from target site*/
function scrapeItems(url) {
    request(site, function(error, response, html) {
        if (error) console.log("Error Scraping", error);
        var $ = cheerio.load(html);
        const title = []
        const description = []
        const link = []
        $('article').each(function(i, element) {
        	title[i] = $('h1.editorial-title', this).text()
        	if($('h1.editorial-title > a', this).attr('href')) {
        		link[i] = $('h1.editorial-title > a', this).attr('href')
        	} 
        	else {
        		link[i] = 'No Link Available'
        	}
        	if($('p.editorial-deck', this).text()) {
        		description[i] = $('p.editorial-deck', this).text()
        	} 
        	else {
        		description[i] = 'No Description'
        	}
          	const scrapeItem = new Scrape({
            title: title[i],
            url: link[i],
            description: description[i]
            });
    	    scrapeItem.save(function(error) {
                if(error) console.log("Error saving: ", error)
        	});
        });
    });
}