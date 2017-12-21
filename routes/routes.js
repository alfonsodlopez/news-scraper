/*Dependencies*/
const express = require('express');
const router = express.Router();
const Scrape = require('../models/Scrape.js');
const Note = require('../models/Note.js');
const scraper = require('../controllers/app.js');

router.get('/', function(request, response) 
{
	/*Get scraped items*/
	Scrape.find({}, function(error, data) 
	{
		if (error) console.log("Error getting items", error);
		response.render('index', {title: "PodcastScraper", Podcasts: data});
	});

}); 

/*Scrape Route*/
router.get('/scrape', function(request, response) 
{
	/*Run scraping funcion*/
	scraper.scrapeItems(function() 
	{
		/*scrape then return to home page*/
		response.redirect('/');
	});
});

/*Get Notes Route*/
router.get('/note/:id', function(request, response) 
{
	Scrape.findOne({_id: request.params.id})
		.populate("note")
		.exec(function(error, doc) {
			if (error) console.log("Error getting notes", error);
			response.send(doc.note);		
		});
});

/*Post Notes Route*/
router.post('/note/:id', function(request, response) 
{
	const newNote = new Note(request.body);

	newNote.save(function(error, doc) 
	{
		Scrape.findOneAndUpdate(
			{_id: request.params.id},
			{$push: {note: doc._id}},
			{new: true},
			function(err, data) {
				if (error) console.log("Error posting note", error);
				response.send(data);
			});
	});
});

/*Delete Notes Route*/ 
router.post('/deleteNote/:id', function(request, response) 
{
	console.log(request.params.id);
	Note.findByIdAndRemove({_id: request.params.id}, function(error) 
	{
		if (error) console.log('Error deleting note', error);
		response.send();
	});
})

module.exports = router;
