var express = require('express');
var open = require('open');
var path = require('path');

var port = 3000;
var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(error) {
    if (error)
        console.log(error);
    else
        open('http://localhost:' + port);
});
