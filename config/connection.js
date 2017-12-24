/*Import Mongoose*/
const mongoose = require('mongoose');

/*Point to MongoDB*/
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;

// mongodb connection
mongoose.connect(MONGODB_URI, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

/*Connect to mongodb
mongoose.connect('mongodb://localhost/test');*/

/*Message if successful*/
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => 'Connected!')

/*export database*/
module.exports = db;