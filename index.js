var http = require('http');

http.createServer(function(req, res) {
    path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch (path) {

        case '':
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end('<H1>Homepage</H1>');
            break;

        case '/about':
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end('About');
            break;

        case '/Login':
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end('Login');
            break;

         case '/Coursework':
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end('Coursework');
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not Found');
            break;


    }

}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate...');

    
