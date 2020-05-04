const express = require('express');
const controller = express.Router();
const userDao = require('../models/users.js');
const auth = require('../auth/auth.js');
const { ensureLoggedIn } = require('connect-ensure-login'); 


controller.get("/register", ensureLoggedIn('/login'), function(request, response) {
    response.render("user/register");
})



controller.post("/register",  function(request, response) {
    const user = request.body.username;
    const password = request.body.pass;
    console.log("register user", user, "password ",  password);
    if (!user || !password) {
        response.send(401, 'no user or no password');
        return;
    }
    userDao.lookup(user, function(err, u) {
        if (u) {
            response.send(401, "User exists:", user);
            return;
        }
        useDao.create(user, password);
        response.redirect('/login');
    });  
})


controller.get(ensureLoggedIn('/login'), function(request, response) {
    response.render("user/login");
});


controller.post(ensureLoggedIn('/login'), auth.authorize("/login"), function(request, response) {
    response.redirect("/");
});


