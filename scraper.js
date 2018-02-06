var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    webSecurityEnabled: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
});

var utils = require('utils');
var fs = require('fs');
var passValues = {};
var allContent = [];
var pageContent =[];

//casper.echo("Casper CLI passed args:");
//require("utils").dump(casper.cli.args);

var url = "https://bitcointalk.org/index.php?topic=2243947.0";

//var url = casper.cli.args[0];


casper.start(url, function() {
  // do something
});
//all functions for specific data extraction
function getLink() {
  var link = $('.subject a');
  return _.map(link, function(e){
    return e.getAttribute('href');
  });
};
function getLinkTitle() {
  var linkTitle = $('.subject a');
  return _.map(linkTitle, function(e){
    return return e.innerText;
  });
};

function getPage() {
    var title = $('.tborder');
	return _.map(title, function(e) {
    return e.innerText
  });
};

  function getDescription() {
      var desc = $('div .postingBody');
      return _.map(desc, function(e) {
      return e.innerText;
    });
  };

  function getAge() {
	  var age = $('.metaInfoDisplay');
	  return _.map(age, function(e) {
      return e.innerText;
    });
  };

  function getPosting() {
      var posting = $('.posting');
      return _.map(posting, function(e) {
      return e.nnerText;
    });
  };

  function getImageSource() {
      var image = $('li a img');
      return _.map(image, function(e) {
      return e.getAttribute('src');
    });
  };


casper.then(function() {
 // var page = this.evaluate(getPage);
 // utils.dump(page);
casper.echo("links");
casper.echo("</br>");
  var link = this.evaluate(getLink);
  utils.dump(link);
  casper.echo("links title");
  casper.echo("</br>");
  var link = this.evaluate(getLinkTitle);
  utils.dump(link);

});//END THEN

casper.run(function() {
  this.exit();
});
