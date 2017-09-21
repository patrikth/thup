var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
//var util = require('util');

var file = 'node_test/redirects.json'

app.get('/admin', function (req, res) {
    //res.send('admin');
    res.render('node_test/index.html');
});

app.get('/*', function (req, res) {
    jsonfile.readFile(file, function(err, obj) {
        if (typeof(obj[req.hostname]) != "undefined" && typeof(obj[req.hostname][req.path]) != "undefined") {
                res.redirect(301, obj[req.hostname][req.path])
        }
        else {
                res.redirect(301, 'http://www.google.com/')
        }         
    });    
});

app.listen(3000, function () {
  console.log('Redirection Service by THUP listening on port 3000! Up and running...');
});
