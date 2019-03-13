var mongoose = require("mongoose");

//____________________________________________________________________________________________________

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  body: String
});

var quantaNotes = mongoose.model("quantaNotes", NoteSchema);
var natureNotes = mongoose.model("natureNotes", NoteSchema);
var nautilusNotes = mongoose.model("nautilusNotes", NoteSchema);

//____________________________________________________________________________________________________

module.exports = {
  quantaNotes,
  natureNotes,
  nautilusNotes
};
