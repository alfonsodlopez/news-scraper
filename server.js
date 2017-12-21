/*Dependencies*/
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const logger = require('morgan');
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

/*Set port to environment variable or localhost*/
const port = process.env.PORT || 3000;

/*Require models*/
const db = require('./config/connection.js');

/*Require routes*/
const routes = require("./routes/routes");

/*Initialize App*/
const app = express();

/*Log request*/
app.use(logger('dev'));

/*Set body-parser middleware*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*Set Handlebars as View Engine*/
app.engine('exphbs', exphbs({defaultLayout: 'main', extname: 'exphbs', partialsDir: [__dirname + '/views/partials']}))
app.set('view engine', 'exphbs');

/*Set static directory*/
app.use(express.static('public'));

/*app.use('/', routes);
*/
/*Start listening*/

app.listen(port, function() {
	console.log("Listening on port: " + port);
});