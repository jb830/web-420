/*
============================================
; Title:  brumfield-composer.js 
; Author: Professor Krasso
; Date: 2. February, 2024
; Modified by: Joanna Brumfield
; Description: Composer RESTful API
;===========================================
*/

//Add a require statement for mongoose and assign it to a variable named mongoose.
const mongoose = require('mongoose');

//Add a new variable named Schema and assign it the mongoose.Schema object. 
const Schema = mongoose.Schema;

// Create a schema named composerSchema with the following fields: 
// Field Name: firstName, Data Type: String, Schema: n/a, 
// Field Name: lastName, Data Type: String, Schema: n/a, 
const composerSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true }
})

//Name the model “Composer” and export it using module.exports
module.exports = mongoose.model('Composer', composerSchema);

