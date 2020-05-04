
const express = require('express');
const controller = express.Router();
const userDao = require('../models/user.js');
const bookDao = require('../models/guestbook.js')
const auth = require('../auth/auth.js');
const { ensureLoggedIn } = require('connect-ensure-login');


controller.get("/guestbook", function (request, response) {
    bookDao.getAllEntries()
        .then((list) => {
            response.render("entries", {
                "title": "Guest Book",
                "entries": list,
                "user": request.user
            });
            //console.log(list);
        })
        .catch((err) => {
            console.log('Error getting all entries: ')
            console.log(JSON.stringify(err))
        });
});

controller.get('/new-entry', ensureLoggedIn('/login'), function(request, response) {
    response.render("newEntry", {
        'user': request.user.user
    });
})

controller.post('/new-entry', ensureLoggedIn('/login'), function (request, response) {
    //console.log('post request ' + request.body.author+ request.body.subject+ request.body.contents);
    if (!request.body.subject || !request.body.contents) {
        response.status(400).send("Entries must have a title and content.");
        return;
    }
    bookDao.create(request.body.author, request.body.subject, request.body.contents, Date.now());
    response.redirect("/guestbook");
});

controller.get("/", function(request, response) {
    response.type('html');
    response.end('<h1>The landing page.</h1>');
});

controller.get("/login", function(request, response) {
    response.render("user/login");
});

controller.post("/login", auth.authorize("/login"), function(request, response) {
    response.redirect("/guestbook");
});

controller.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/guestbook");
});

controller.get('/register', function(request, response) {
    response.render("user/register");
});

controller.post("/register", function(request, response) {
    const user = request.body.username;
    const password = request.body.pass;
    //console.log("register user", user, "password",  password);
    if (!user || !password) {
        response.send(401, 'no user or no password');
        return;
    }
    userDao.lookup(user, function(err, u) {
        if (u) {
            response.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        response.redirect('/login');
    });  
})

controller.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send("404 - Not found.");
});

module.exports = controller;