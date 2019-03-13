var mongoose = require("mongoose");

//____________________________________________________________________________________________________

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  theme: {
    type: String
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  authors: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    //ref: "Note"  //can be uncommented if you want a "default" ref; otherwise the specific ones are defined below
  }
}, { upsert: true });


var quantaArticles = mongoose.model("quantaArticles", ArticleSchema);
quantaArticles.schema.paths.note.options.ref = "quantaNotes";
var natureArticles = mongoose.model("natureArticles", ArticleSchema);
natureArticles.schema.paths.note.options.ref = "natureNotes";
var nautilusArticles = mongoose.model("nautilusArticles", ArticleSchema);
nautilusArticles.schema.paths.note.options.ref = "nautilusNotes";


//console.log(natureArticles.schema.paths.note.options);    //.schema.childSchemas);

//____________________________________________________________________________________________________

module.exports = {
  quantaArticles,
  natureArticles,
  nautilusArticles
};
