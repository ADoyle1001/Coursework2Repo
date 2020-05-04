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

controller.get('/add', function(request, response) {
    response.render("new-coursework");
    //console.log("Render new coursework form");
})

controller.post('/add', function(request, response){
    if (!request.body.subject || !request.body.contents) {
        response.status(400).send("Entries must have a title and content.");
        return;
    }
entries.create(request.body.author, request.body.subject, 
request.body.contents, Date.now());                          
    response.redirect("/courseworks");
})



module.exports = controller;
