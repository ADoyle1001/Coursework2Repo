var express = require("express"),
path = require("path"),
mustache = require('mustache-express'),
bodyParser = require('body-parser'),
controller = require('./controllers/routes.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('mustache', mustache());

app.set('view engine', 'mustache');

var staticPath = path.resolve(__dirname, "../static");
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', controller);

app.listen(app.get('port'), function () {
    console.log('server started, control^c to quit...');
})