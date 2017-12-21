/*Dependencies*/
const cheerio = require('cheerio');
const request = require('request');
const Scrape = require('../models/Scrape.js');

/*Site to scrape*/
let site = 'https://www.wired.com/most-recent/'

/*Function to get items from target site*/
function scrapeItems(url) {
request(site, function(error, response, html) {
    if (error) console.log("Error Scraping", error);
    var $ = cheerio.load(html);
    const title = []
    const description = []
    const link = []
    $(".archive-list-component").each(function(i, element) {
    	title[i] = $('.archive-item-component__title', this).text()
    	description[i] = $('.archive-item-component__desc', this).text()
    	link[i] = $('.archive-item-component__link',this).attr('href')
      var scrapeItem = new Scrape({
        title: title,
        url: link,
        description: description
      });
  	console.log(title[i])
  	console.log(description[i])
  	console.log(link[i])
      scrapeItem.save(function(error) {
      	if(error) console.log("Error saving: ", error)
    	});
    });
  });
}
scrapeItems(site)