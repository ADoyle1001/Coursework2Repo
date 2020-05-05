
const express = require('express');
const controller = express.Router();
const userDao = require('../models/users.js');
const auth = require('../auth/auth.js');


controller.get("/", function(request, response) {
    response.render("user/mainpage")
});

controller.get("/login", function(request, response) {
    response.render("user/login");
});

controller.post("/login", auth.authorize("/login"), function(request, response) {
    response.redirect("/courseworks");
});

controller.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/login");
});

controller.get("/register", function(request, response) {
    response.render("user/register");
});

controller.post("/register", function(request, response) {
    const user = request.body.username;
    const password = request.body.pass;
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