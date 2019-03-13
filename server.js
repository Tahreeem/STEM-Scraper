var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

//____________________________________________________________________________________________________

var PORT = process.env.PORT || 3000;

var app = express();

// Configure middleware
app.use(logger("dev")); // Use morgan logger for logging requests
app.use(express.urlencoded({ extended: true })); // Parse request body as JSON
app.use(express.json());
app.use(express.static("public")); // Make public a static folder


var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));
// exphbs.registerPartial('navbar', '{{navbar}}');


// Import routes and give the server access to them.
require("./routes/htmlRoutes.js")(app);
var routes = require("./routes/apiRoutes.js");
app.use(routes);


mongoose.set('useCreateIndex', true);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
var collectionNames;
dbConnection.once('open', function () {
  console.log("MongoDB is connected");
  dbConnection.db.listCollections().toArray((error, collections) => {
    if (error) console.log(error);
    collectionNames = collections.map((collection) => collection.name);
    module.exports = { collectionNames }; //not of use right now but may become useful
    //console.log(module.exports.collectionNames);
  });
});



app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});