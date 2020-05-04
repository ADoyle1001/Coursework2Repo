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
    //console.log("Render new coursework form");
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
        //console.log('Delete link clicked with argument', request.params.student);
        dao.deleteCoursework(request.params.CourseworkTitle);
        response.redirect("/courseworks");
    })


module.exports = controller;
