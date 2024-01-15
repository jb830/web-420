/*
============================================
; Title:  brumfield-app.js 
; Author: Professor Krasso
; Date: 9, January, 2024
; Modified by: Joanna Brumfield
; Description: RESTful API github setup
;===========================================
*/
// •	Add an app.js file with “require” statements for express, http, swagger-ui-express, swagger-jsdoc, and mongoose.
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

//•	Create a new variable named app and assign it to express library (refer back to the solutions you built in web-340, if you need refresher). 
const app = express();

// •	Set the port to process.env.PORT || 3000
const port = process.env.PORT || 3000;

// •	Set the app to use express.json()
app.use(express.json());

// •	Set the app to use express.urlencoded({‘extended’: true});
app.use(express.urlencoded({extended: true}));
// •	Define an object literal named options with the following properties/values
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB 420 RESTful APIs',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
//Create a new variable name openapiSpecification and call the swaggerJsdoc library using the options object literal.  For example, const openapiSpecification = swaggerJsdoc(options);
const openapiSpecification = swaggerJsdoc(options);

//Wire the openapiSpecification variable to the app variable (see Exhibit D).
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//Finally, use the http library to create a new server that listens on the port you set (port 3000).  In the body of the createServer() function add a console.log() statement that says, “Application started and listening on port <portNumber>.”
http.createServer(app).listen(3000, function () {
  console.log('App started on port 3000');
});