
//dependencies:
var express = require('express');
var path = require('path');

//set up server:
var app = express();
var port = process.env.PORT || 4000;

app.use(express.static('public'));

//Listener
app.listen(port, function() {
  console.log('thx for listening on channel', port);
});
