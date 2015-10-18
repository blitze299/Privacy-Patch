var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var logger = require('morgan');
var compression = require('compression');

var routes = require('./routes/index');

var app = express();

// use jade as template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use body-parser for post requests
app.use(bodyparser.urlencoded({extended: true}));

// use morgan logger in development mode
app.use(logger('dev'));

// use compression
app.use(compression());

// serve static files from ./public
app.use(express.static(path.join(__dirname, 'public')));

// use only one route file
app.use('/', routes);

// port can be defined using a environment variable
var port = process.env.PORT || 3000;
app.listen(port);

// startup log message
console.log('Server is listening on port ' + port);
