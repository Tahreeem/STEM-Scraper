var express = require("express");
({ quantaArticles, natureArticles, nautilusArticles } = require("../models/ArticleModels")); //models
({ quantaNotes, natureNotes, nautilusNotes } = require("../models/NoteModels")); //models
({ articlesJSONSender } = require("../controllers/apiRoutesController.js")); //controllers 1/3
({ scraper, quantaScraper, natureScraper, nautilusScraper } = require("../controllers/scrapeController.js")); //controllers 2/3
var Promise = require("bluebird");
//({ createArticle, findArticle, createArticleAsync, findArticleAsync } = Promise.promisifyAll(require("../controllers/dbController.js"))); //controllers 2/2
({ createArticle, findArticle } = require("../controllers/dbController.js")); //controllers 3/3
//Promise.promisifyAll(require("mongoose"));

//____________________________________________________________________________________________________
var router = express.Router();


router.get("/scrape", function (req, res) {

    var scraperArgsArray = [
        ["https://www.quantamagazine.org/archive/", "div.card.clearfix.mv05.pv1", quantaScraper, quantaArticles],
        ["https://www.nature.com/srep/articles", "li.border-gray-medium.border-bottom-1.pb20", natureScraper, natureArticles],
        ["http://nautil.us/term/l/Matter", "article.search-result", nautilusScraper, nautilusArticles],
        ["http://nautil.us/term/l/Biology", "article.search-result", nautilusScraper, nautilusArticles],
        ["http://nautil.us/term/l/Numbers", "article.search-result", nautilusScraper, nautilusArticles]
    ];

    //var nautilusCategories = ["Physics","Aerodynamics","Chemistry","Cryptography","Math"];

    Promise.map(scraperArgsArray, scraperArgs => {
        return scraper(...scraperArgs);
    }).then((numScrapedArray) => {
        var sum = numScrapedArray.reduce((a,b) => a + b, 0);
        res.send(sum+" articles scraped!");
    }).catch(error => {
        console.log(error.message);
    });

});

router.get("/api/articles", function (req, res) {
    articlesJSONSender({}, res);
});

router.get("/api/articles/theme/:theme", function (req, res) {
    articlesJSONSender({ theme: req.params.theme }, res);
});

router.get("/api/articles/title/:title", function (req, res) {
    articlesJSONSender({ title: req.params.title }, res);
});

router.get("/api/articles/authors/:authors", function (req, res) {
    articlesJSONSender({ authors: { "$regex": req.params.authors, "$options": "i" } }, res);
});

// Route for saving/updating an Article's associated Note
router.post("/api/articles/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});



//____________________________________________________________________________________________________

module.exports = router;
