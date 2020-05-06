
const express = require('express');
const controller = express.Router();
const UserDAO = require('../models/users.js');
const auth = require('../auth/auth.js');
const DAO = require('../models/courseworks.js');

let dao = new DAO();

dao.init();

controller.get("/courseworks", function (request, response) {
    dao.getAllEntries()
        .then((list) => {
            console.log(list);
            response.render("courseworklisting", {
                entries: list
            });
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
});

controller.post('/addCoursework', function (request, response) {
    console.log('post request ' + request.body.Ctitle+ request.body.modules+ request.body.milestones+ request.body.duedate+ request.body.completed);
    if (!request.body.modules || !request.body.milestones) {
        response.status(400).send("Courseworks must have milestones and modules.");
        return;
    }
    dao.addCoursework(request.body.Ctitle, request.body.modules, request.body.milestones, request.body.duedate, request.body.completed);
    response.redirect("/courseworks");
})

controller.get('/addCoursework', function(request, response) {
    response.render("addCoursework"); 
})

controller.get('/delete/:Ctitle', function(request, response) {
        
    dao.deleteCoursework(request.params.Ctitle);
    response.redirect("/courseworks");
})

controller.get('/edit/:Ctitle', function(request, response) {
    //console.log('Edit get link clicked with argument', request.params.student);
    dao.getCoursework(request.params.Ctitle)
    .then((list) => {
        //console.log("Render edit student page with", list);
        response.render("editCoursework", {
            
            "item":list
        });
    })
    .catch((err) => {
        console.log('Error getting coursework:', request.params.title, err);
    });
})

//this is much easier with sessions, see week 10
controller.post('/edit/:Ctitle', function(request, response) {
dao.updateCoursework( request.body.Ctitle, request.body.module, request.body.milestones, request.body.duedate, request.body.completed);
response.redirect("/courseworks");
})

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
    UserDAO.lookup(user, function(err, u) {
        if (u) {
            response.send(401, "User exists:", user);
            return;
        }
        UserDAO.create(user, password);
        response.redirect('/login');
    });  
})

controller.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send("404 - Not found.");
});

module.exports = controller;