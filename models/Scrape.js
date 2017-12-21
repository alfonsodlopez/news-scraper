/*Require Mongoose*/
const mongoose = require('mongoose');

/*Require the connection*/
const db = require("../config/connection.js");

/*Schema for items scraped*/
const Schema = mongoose.Schema;
const ScrapeSchema = new Schema({
	title : {
		type: String,
		required: true,
		unique: true,
		dropDups: true
	},
	url: {
		type: String,
		required: true,
		unique: true,
		dropDups: true
	}, 
	description: {
		type: String,
		required: false	
	},
	note: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Note' 
	}]

})

const Scrape = mongoose.model('Scrape', ScrapeSchema);

module.exports = Scrape;