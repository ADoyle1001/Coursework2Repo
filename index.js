var app = express();

//define the port, either use the existing environment variable or 3000
app.set('port', process.env.PORT || 3000);

//define Mustache as the view engine
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//use the ../static folder to serve static resources, e.g. images
var staticPath = path.resolve(__dirname, "../static");
app.use(express.static(staticPath));

//use controller (defined above) for handling requests
app.use('/', controller);

//listen on the defined port and log the fact
app.listen(app.get('port'), function () {
    console.log('server started');
})
