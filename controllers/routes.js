const express = require('express');
const controller = express.Router();
let DAO = require('../models/guestbook.js');

let dao = new DAO();

dao.init();

controller.get("/guestbook", function (request, response) {
    dao.all()
        .then((list) => {
            console.log(list);
            response.render("entries", {
                entries: list
            });
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
});


module.exports = controller;
