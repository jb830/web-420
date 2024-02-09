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
const composerRoutes = require('./routes/brumfield-composer-routes');
const personRoutes = require('./routes/brumfield-person-routes');

//•	Create a new variable named app and assign it to express library (refer back to the solutions you built in web-340, if you need refresher). 
const app = express();

// •	Set the port to process.env.PORT || 3000
app.set('port', process.env.PORT || 3000);

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
  apis: ['./routes/brumfield-composer-routes.js', './routes/brumfield-person-routes.js'],
        
};

//Route set up for composer & person 
app.use('/api/composers', composerRoutes);
app.use('/api/people', personRoutes);

//Create a new variable name openapiSpecification and call the swaggerJsdoc library using the options object literal.  For example, const openapiSpecification = swaggerJsdoc(options);

const openapiSpecification = swaggerJsdoc(options);

//Wire the openapiSpecification variable to the app variable (see Exhibit D).
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//mongo setup with mongoose
const mongoDB = 'mongodb+srv://web420_user:s3cret@web420db.adii6dg.mongodb.net/web420DB?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Application connected to Atlas');
});

//Finally, use the http library to create a new server that listens on the port you set (port 3000).  In the body of the createServer() function add a console.log() statement that says, “Application started and listening on port <portNumber>.”
http.createServer(app).listen(app.get('port'), function() {
  console.log(`Application started and listening on port ${app.get('port')}`);
})