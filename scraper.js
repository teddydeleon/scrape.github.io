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
var x = require('casper').selectXPath;
var utils = require('utils');
var fs = require('fs');
var passValues = {};
var allContent = [];
var pageContent =[];

//casper.echo("Casper CLI passed args:");
//require("utils").dump(casper.cli.args);

var url = "https://bitcointalk.org/index.php?board=159.0";

//var url = casper.cli.args[0];


casper.start(url, function() {
  // do something
});

function getPageLink() {
  var link = $('.middletext a');
  return _.map(link, function(e){
    return e.getAttribute('href');
  });
};

//all functions for specific data extraction
function getLink() {
  var link = $('.windowbg a');
  return _.map(link, function(e){
    return e.getAttribute('href');
  });
};
function getSubject() {
  var linkTitle = $('.subject a');
  return _.map(linkTitle, function(e){
  return e.innerText;
  });
};

function getPage() {
    var title = $('.tborder');
	return _.map(title, function(e) {
    return e.innerText
  });
};

  function getDate() {
      var desc = $('.smalltext span');
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
      var image = $('a .userimg');
      return _.map(image, function(e) {
      return e.getAttribute('src');
    });
  };
  
  function getDataArray(){
	var dataArray = []; 
	var linkArray = [];
	var link = this.evaluate(getLink);	
	var linkTitle = this.evaluate(getLinkTitle); 
	  
   
   
    for(var i=0; i<=link.length;i++){
		linkArray = link[i];
        dataArray = "link:  "  + link[i] + " title:   " + linkTitle[i];
        
    }
	return dataArray;
  }
	casper.then(function() {	
		var link = this.evaluate(getLink);	
		utils.dump(link);
		
		var pageLink = this.evaluate(getPageLink);	
		utils.dump(pageLink);
   
    
	})
	
	casper.then(function() {
    var count = this.getElementsInfo("a").length;
    for(var i = 1; i <= count; i++){
        this.thenClick(x('(//a)['+i+']'))
            .then(function(){
                console.log('clicked ok, new location is ' + this.getCurrentUrl());
            })
            .back()
            .then(function(){
                console.log('back to location ' + this.getCurrentUrl());
            });
    }
});
	
	casper.then(function() {	
		var link = this.evaluate(getLink);	
		utils.dump(link);
		
		var pageLink = this.evaluate(getPageLink);	
		utils.dump(pageLink);
   
    
	})//END FOR
	
//command to run in terminal
//casperjs --proxy=173.234.248.235:3128 --proxy-type=http scraper.js


casper.run(function() { 
  this.exit();
});

