var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

app.use(function (request, response) {
  response.type('text/plain');
  response.status(404);
  response.send("test");
  });
  
  app.listen(app.get('port'), function () {
    console.log('server running. ctrl^c to stop');
      });
  app.get("/", function (request, response) {
    response.status('text/html');
    response.send('<h1>Home Page</h1>');
    });
