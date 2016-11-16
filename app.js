var fs = require('fs');
var path = require('path');


var templates_list = JSON.parse(fs.readFileSync('./schema.json', 'utf8'));

var htmlHead = "<html><head><title>Templates</title></head><body>";
var htmlEnd = "Done!</body></html>";

var letterBodyStart=fs.readFileSync('./Views/letterBodyStart.html','utf8', function (err) {
  if (err)
      return console.log(err);

});
var letterBodyEnd=fs.readFileSync('./Views/letterBodyEnd.html','utf8', function (err) {
  if (err)
      return console.log(err);

});

function addSectionToHTML(fileName, key,value){
//var htmlData = require('./Views/'+value+'.html');
if ((key == 'headerText') || (value == '&nbsp;'))
{

    var htmlData = '<tr><td style=\"padding:5px\; color:#ABB7B7; font-family:Helvetica; font-size:13px;">'+value+'</td></tr>';

}else{
  var htmlData = fs.readFileSync('./Views/'+value+'.html','utf8', function (err) {
    if (err)
        return console.log(err);

  });

}


   fs.appendFileSync('./Emails/templates/'+fileName+'.html', htmlData, 'utf8');

}

fs.writeFileSync('./Emails/index.html', htmlHead, 'utf8');
var templateNumber=1;
templates_list.forEach(function(n){
    console.log(templateNumber+++' '+n.templateName);
      //creating template file
    fs.writeFileSync('./Emails/templates/'+n.templateName+'.html', htmlHead+letterBodyStart, 'utf8');
    //adding template url to index.html
    var linkData = '<div style=\"padding:0px; margin:0px;\"><a href=\"./templates/'+n.templateName+'.html\" style="font-family:Helvetica,Arial; font-size:15px;">'+n.templateName+'</a></div>\n';
      fs.appendFileSync('./Emails/index.html', linkData,'utf8');

    //creating email template section by section
    for (var key in n.htmlschema){
      //   console.log(' name=' + key + ' value=' + n.htmlschema[key]);
     if (n.htmlschema[key]){
        addSectionToHTML(n.templateName,key,n.htmlschema[key]);
      }
    }

    fs.appendFileSync('./Emails/templates/'+n.templateName+'.html', letterBodyEnd+htmlEnd, 'utf8');

})
//close index.html
fs.appendFileSync('./Emails/index.html', htmlEnd, 'utf8');
