var express = require("express"),
session = require('express-session'),
path = require("path"),
mustache = require('mustache-express'),
bodyParser = require('body-parser'),
controller = require('./controllers/routes.js'),
auth = require('./auth/auth');

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('mustache', mustache());

app.set('view engine', 'mustache');

var staticPath = path.resolve(__dirname, "../static");
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));

// initialize authentication with passport
auth.init(app); 

app.use('/', controller);

app.listen(app.get('port'), function () {
    console.log('server started, ctl^c to quit');
})

