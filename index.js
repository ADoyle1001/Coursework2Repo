//import libraries
var express = require("express"),
path = require("path"),
mustache = require('mustache-express'),
controller = require('./controllers/routes.js');

//use the express framework for the application
var app = express();

//define the port, either use the existing environment variable or 3000
app.set('port', process.env.PORT || 3000);

//define Mustache as the view engine
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

;

//use controller (defined above) for handling requests
app.use('/', controller);

//listen on the defined port and log the fact
app.listen(app.get('port'), function () {
    console.log('server started');
})
