const express = require('express');
const controller = express.Router();
let DAO = require('../models/courseworks.js');
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

controller.get('/addCoursework', function(request, response) {
    response.render("addCoursework");
    
})

controller.post('/post', function (request, response) {
    if (!request.body.title) {
        response.status(400).send("Coursework title must be provided.");
        return;
    }
    entries.create(request.body.title, request.body.module, 
    request.body.milestone);                          
        response.redirect("/courseworklisting");
    })
    
    controller.get('/delete/:CourseworkTitle', function(request, response) {
        
        dao.deleteCoursework(request.params.CourseworkTitle);
        response.redirect("/courseworks");
    })

    controller.get('/edit/:CourseworkTitle', function(request, response) {
        //console.log('Edit get link clicked with argument', request.params.student);
        dao.getCoursework(request.params.CourseworkTitle)
        .then((list) => {
            //console.log("Render edit student page with", list);
            response.render("editCoursework", {
                "title": "Database Example",
                "item":list
            });
        })
        .catch((err) => {
            console.log('Error getting student:', request.params.student, err);
        });
    })

    //this is much easier with sessions, see week 10
    controller.post('/edit/:CourseworkTitle', function(request, response) {
    dao.updateCoursework( request.body.CourseworkTitle, request.body.CourseworkModule, request.body.ProjectMilestones);
    response.redirect("/courseworks");
})

module.exports = controller;
