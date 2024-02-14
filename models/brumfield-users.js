/*
============================================
; Title:  brumfield-users.js 
; Author: Professor Krasso
; Date: 14. February, 2024
; Modified by: Joanna Brumfield
; Description: User RESTful API
;===========================================
*/

//Add a require statement for mongoose and assign it to a variable named mongoose.
const mongoose = require('mongoose');

//Add a new variable named Schema and assign it the mongoose.Schema object. 
const Schema = mongoose.Schema;

//Create a schema named userSchema with the following fields:
// Field Name: userName, Data Type: String, Schema: n/a
// Field Name: Password, Data Type: String, Schema: n/a
// Field Name: emailAddress, Data Type: Array, Schema: n/a
const userSchema = new Schema ({
    userName : {type: String, required: true},
    password : {type: String, required: true},
    email : {type: Array, required: true}
});


//Name the model “Person” and export it using module.exports
module.exports = mongoose.model('User', userSchema);