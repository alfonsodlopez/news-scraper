/*Require Mongoose*/
const mongoose = require('mongoose');

/*Require the connection*/
const db = require("../config/connection.js");

/*Schema for Note*/
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
	noteText: { type: String }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;