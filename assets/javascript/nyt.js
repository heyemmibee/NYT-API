class ArticleData {
  constructor (headline, link, date, author, snippet) {
    this.headline = headline;
    this.link = link;
    this.date = date;
    this.author = author;
    this.snippet = snippet;
  }
}

// ===== constants ==================================

var data = [];


// ===== Variables ====================================
var headline;
var link;
var author;
var date;
var snippet;


window.onload = function() {
  getAPIdata();
};

/**
 * Makes Ajax call to trivia database API to gather information for questions.
 * @param {*} t 
 */
const getAPIdata = () => {
  var queryURL;
  var search = 'tornados';
  var startDate = '20180101';
  var endDate = '20180601';
  queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&facet_fields=source&facet=true&begin_date=${startDate}&end_date=${endDate}&api-key=DlfCEuS6bbwlY8TrohRFv1qbrqmsUi7b`


  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(resp) { 
    var maxArticles;
    // Set # of articles 
    if (resp.response.docs.length < 10) {
      maxArticles = resp.response.docs.length
    } else {
      maxArticles = 10;
    }

    for (var i = 0; i < maxArticles; i++) {
      var article = resp.response.docs[i];
      headline = article.headline.main;
      link = article.web_url;
      author = article.byline.person.firstname + " " + article.byline.person.lastname;
      // author = `${article.byline.person.firstname} ${article.byline.person.lastname}`;
      date = article.pub_date;
      snippet = article.snippet;
      data.push(new ArticleData (headline, link, date, author, snippet) );
    }
  })
}
console.log(data);
