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


var fs = require('fs');
var passValues = {};
var allContent = [];
var pageContent =[];

var url = 'http://losangeles.backpage.com/WomenSeekMen/';


casper.start(url, function() {
  // do something
});
//all functions for specific data extraction
function getLink() {
  var link = $('div .cat a');
  return _.map(link, function(e){
    return e.getAttribute('href');
  });
};

function getTitle() {
    var title = $('.h1link h1');
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
  link = this.evaluate(getLink);
  for(i = 0; i < 2; i++){
  casper.thenOpen(link[i], function() {
    casper.wait(5000);
    this.echo(this.getCurrentUrl());
      //get the title
	      title = this.evaluate(getTitle);
       pageContent.push(title);
      //get the description
        des = this.evaluate(getDescription);
        pageContent.push(des);
      //get the age
        age = this.evaluate(getAge);
        pageContent.push(age);
      //get posting
        posting = this.evaluate(getPosting);
        pageContent.push(posting);
      //get image source and push them into array
        image = this.evaluate(getImageSource);
         for(i = 0; i < image.length; i++){
           var path = image[i].slice(-36);
           pageContent.push(path);
           this.download(image[i], 'C:\\projects\\test\\images\\'+ path);
         }
       allContent.push(pageContent);
       this.echo("all contents");
       //turn all arrays into a json object
	     var allContents = JSON.stringify(allContent);
       //push all data into a global object to pass to "run function"
       passValues.valContent = allContents;
     });//END OPEN

  }//END FOR

});//END THEN

casper.run(function() {
  var posts = passValues.valContent;
  fs.write('data.json', posts , 'w');
  require('utils').dump(posts).exit();
  
});
