# Web Platform Development 2 Repo




## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Web application to allow users to track assignments and set milestones



## Technologies
* node.js 
* Express - v3.0.1
* bcrypt - v2.4.3
* mustache - v1.3.0
* passport - v0.4.1

## Setup
to run and install on local machine enter the following commands in the git termnal : 


Node install bycryptjs

Npm install mustache --save

Npm install nedb --save

Npm  install passport -- local

Npm install bycryptjs  

Npm install mustache --save

Npm install nedb --save 

Npm  istall passport -- local


node index.js

go to "localhost:3000" once prompted that server has started


## Code Examples
Show examples of usage:
controller.post("/register", function(request, response) {
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

## Features

* Adding courseworks
* Adding milestones
* adding deadlines
* Checking off completed coursework



## Status
Project is: _finished_

## Inspiration
Coursework task assigned by GCU for Web Platform development 2 module

## Contact
Created by :

LMCKAY202@caledonian.ac.uk
AMAHMU201@caledonian.ac.uk
ADOYLE205@caledonian.ac.uk
rhughe205@caledonian.ac.uk


