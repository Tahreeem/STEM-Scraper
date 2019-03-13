var articleModels = [quantaArticles, natureArticles, nautilusArticles];
var Promise = require("bluebird");

//____________________________________________________________________________________________________


function articlesJSONSender(findArticleQuery, res) {

    var cb = function (foundArticles) {
        return foundArticles;
    };

    Promise.map(articleModels, articleModel => {
        return findArticle(findArticleQuery, articleModel, cb);
    }).filter(foundArticles => {
        return foundArticles.length > 0;
    }).then(foundArticles => {
        res.json(foundArticles);
    }).catch(error => {
        console.log(error.message);
    });

}

//____________________________________________________________________________________________________
module.exports = {
    articlesJSONSender
}
