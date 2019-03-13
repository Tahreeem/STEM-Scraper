$.ajax('/api/articles', {
  type: 'GET',
  //data: JSON.stringify(formdata),
  contentType: 'application/json',
  success: function (articleCollections) {

    for (n = 0; n < articleCollections.length; n++) {

      //console.log(articleCollections[n].length);

      var source = $("#article-template").html();
      var template = Handlebars.compile(source);

      for (i = 0; i < articleCollections[n].length; i++) {

        var article = articleCollections[n][i];


        var html = template(article);
        // you will now have some html that you will need to insert into your page
        $("#articles").append(html);

        $(".card-title:last").text(article.title);
        $(".card-subtitle:last").text(article.authors);
        //$(".btn.btn-primary")[cardIndex].innerText = article.link;
        $(".btn.btn-primary:last").attr("href", article.link);

        if (article.description != undefined) $(".card-text:last").text(article.description);

        //if image key exists, add to src value, else make image tag invisible by adding bootsrap invisible class
        article.image
          ? $(".card-img-top:last").attr("src", article.image)
          : $(".card-img-top:last").addClass("invisible");
      }
    }
    $("#article-template").remove();
  },
  error: function () { console.log('error'); }
});

