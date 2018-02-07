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
   
     for(i = 0; i < 2; i++){

  casper.thenOpen(link[i], function() {
    var n = 0;
	
    this.echo(this.getCurrentUrl());
	
	    subject = this.evaluate(getSubject);
		
		pageContent[i] = [];
		
		pageContent[i][n] = subject;
		
		n++;
		
        dates = this.evaluate(getDate);
		
		pageContent[i][n] = dates;
		
		n++;
		
        age = this.evaluate(getAge);
		
		pageContent[i][n] = age;
		
		n++;
		
        image = this.evaluate(getImageSource);
		
		 pageContent[i][n] = [];
		 
         for(t = 0; t < image.length; t++){
			 
           var path = image[t].slice(-36);
		   
           pageContent[i][n][t] += path;
		   
           this.download(image[t], 'C:\\images\\' + path);
         }
		 
		 
	   allContent.push(pageContent[i]);
	   
	   utils.dump(allContent);
	   
	   
	   var allContents = JSON.stringify(allContent);
       passValues.valContent = allContents;
     });//END OPEN
	 
	 
  }//END FOR
	
	

});//END THEN

casper.run(function() {
  var posts = passValues.valContent;
  fs.write('data.json', posts , 'w');
  this.exit();
});

