function createArticle(article, ArticleModel) {

    ArticleModel.create(article)
        .then(function (dbArticle) {
            //console.log(dbArticle);
        })
        .catch(function (error) {
            //console.log(error);
        })
}

function findArticle(findQuery, ArticleModel, cb) {

    return ArticleModel.find(findQuery)
        .populate("note")
        .then(cb)
        .catch(function (error) {
            console.log(error);
        });
}

//____________________________________________________________________________________________________

module.exports = {
    createArticle,
    findArticle
}