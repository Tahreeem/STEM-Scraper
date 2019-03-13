// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function (req, res) {
    res.render('index', {    //NOT SURE YET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      layout: 'main'
    });
  })

  app.get("/index", function (req, res) {
    //res.sendFile(path.join(__dirname, "../public/index.html"));
    res.render('index', {    //NOT SURE YET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      layout: 'main'
    });
  });

  app.get("/articles", function (req, res) {
    res.render('index', {
      layout: 'main'
    });
    // res.sendFile(path.join(__dirname, "../public/articles.html"));
  });

  app.get("/articles/title/:title", function (req, res) {
    res.render('index', {
      layout: 'main',
      title: req.params.title
    });
  });

  app.get("/login", function (req, res) {
    res.render('index', {
      layout: 'loginPage'
    });
  });

  app.get("/authState", function (req, res) {
    res.render('index', {
      layout: 'authState'
    });
  });

  app.get("/authors", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

};
