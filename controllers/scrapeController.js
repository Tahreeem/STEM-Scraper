var axios = require("axios"); // Axios is a promised-based http library, similar to jQuery's Ajax method; works on the client and on the server
var cheerio = require("cheerio");
var { createArticle, } = require("./dbController");

//____________________________________________________________________________________________________

//----------
// ({quantaArticles,natureArticles,nautilusArticles} = require("../models/ArticleModels"));

// var mongoose = require("mongoose");
// mongoose.set('useCreateIndex', true);
// mongoose.connect("mongodb://localhost/scraperdb", { useNewUrlParser: true }); // Connect to the Mongo DB
// var dbConnection = mongoose.connection;
// dbConnection.on('error', console.error.bind(console, 'connection error:'));
// dbConnection.once('open', function () {
//     console.log("we're connected!");
// });

// scraper("https://www.quantamagazine.org/archive/", "div.card.clearfix.mv05.pv1", quantaScraper, quantaArticles).then(values => {
//     //console.log(JSON.stringify(values)); //values should be [null, null] since the promises don't return something within the resolve
//     console.log(values + "Scrape Complete");
// }).catch(error => {
//     console.log(error.message)
// });
//---------

function scraper(url, mainTag, scraping, ArticleModel) {

    return new Promise(resolve => {
        axios.get(url).then(function (response) {

            var $ = cheerio.load(response.data); //load response html into cheerio and save it to $ for a shorthand selector

            $(mainTag).each(function (i, elem) {

                var result = scraping($(elem));
                createArticle(result, ArticleModel);
            });

            return $(mainTag).length;

        }).then((numScraped) => {  //numScraped aka number of scraped articles

            // doing res.send() instead of resolve() won't work here unless res is passed in the arguments
            resolve(numScraped);
        });
    });
}


function quantaScraper(dollarElem) {

    result = {};

    result.theme = dollarElem
        .find("a.kicker.theme__accent.theme__text-hover.uppercase")
        .text();
    result.title = dollarElem
        .find("h2")
        .text();
    result.authors = dollarElem
        .find("span.byline__author.uppercase.kern.light.small")
        .text();
    result.description = dollarElem
        .find('p')
        .text();
    result.link = "https://www.quantamagazine.org" +
        dollarElem
            .find("a")
            .attr("href");
    result.image = dollarElem
        .find("noscript")
        .text()
        .match(/src\s*=\s*\\*"(.+?)\\*"\s*/)[0]
        .replace(/(src\s*=\s*\\*)|("\s*)/g, '');

    return result;
}

function natureScraper(dollarElem) {

    result = {};

    result.title = dollarElem
        .find("h3 a")
        .text()
        .replace(/^\s*(\n)*/g, "");
    result.authors = dollarElem
        .find("span[itemprop=name]")
        .text();
    result.link = "https://www.nature.com" +
        dollarElem
            .find("h3 a")
            .attr("href");

    return result;
}

function nautilusScraper(dollarElem) {

    result = {};

    result.theme = dollarElem
        .find("span.article-tag-focus")
        .text();
    result.title = dollarElem
        .find("h3 a")
        .text();
    result.authors = dollarElem
        .find("p.article-meta")  //by (.*)
        .text()
        .match(/by (.*)/)[0]
        .replace(/(by )/, '');
    result.description = dollarElem
        .find('p')
        .text();
    result.link = "https://nautil.us" +
        dollarElem
            .find("h3 a")
            .attr("href");
    result.image = dollarElem
        .find("img")
        .attr("src");

    return result;
}


//____________________________________________________________________________________________________

module.exports = {
    scraper,
    quantaScraper,
    natureScraper,
    nautilusScraper
}
