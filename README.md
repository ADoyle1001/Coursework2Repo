# Coursework2Repo

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
An online application that allows users to track dealines and milestones of courseworks


## Technologies
* Visual Studio Code - version 1.0
* Express - version 3.0.1
* nedb - version 1.8.0
* bcrypt - version 2.4.3
* mustache - version 1.3.0
* passport - version 0.4.1

## Setup
To run this web application, install locally then 
* cd/ coursework2repo
* npm install
* node index.js


## Code Examples

controller.post("/register", function(request, response) {
    const user = request.body.username;
    const password = request.body.pass;
    if (!user || !password) {
        response.send(401, 'no user or no password');
        return;
    }

## Features

* create an account
* add a coursework
* add milestones for the coursework
* remove the coursework


## Status
Project is:  _finished_

## Inspiration
Coursework set for Web Platfrom development 2 module at GCU

## Contact
Created by 
* Lmckay202@caledonian.ac.uk
* AMAHMU201@caledonian.ac.uk
* ADOYLE205@caledonian.ac.uk
* rhughe205@caledonian.ac.uk
