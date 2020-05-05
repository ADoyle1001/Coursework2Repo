const express = require('express');
const controller = express.Router();
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
controller.get('/', function(request, response) {
    response.redirect("/courseworks");
})

controller.get('/addCoursework', function(request, response) {
    response.render("addCoursework"); 
})

controller.post('/addCoursework', function (request, response) {
    console.log('post request ' + request.body.Ctitle+ request.body.modules+ request.body.milestones);
    if (!request.body.modules || !request.body.milestones) {
        response.status(400).send("Courseworks must have milestones and modules.");
        return;
    }
    dao.addCoursework(request.body.Ctitle, request.body.modules, request.body.milestones);
    response.redirect("/courseworks");
})
    
    controller.get('/delete/:Ctitle', function(request, response) {
        
        dao.deleteCoursework(request.params.title);
        response.redirect("/courseworks");
    })

    controller.get('/edit/:Ctitle', function(request, response) {
        //console.log('Edit get link clicked with argument', request.params.student);
        dao.getCoursework(request.params.title)
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
    dao.updateCoursework( request.body.Ctitle, request.body.module, request.body.milestones);
    response.redirect("/courseworks");
})

module.exports = controller;
