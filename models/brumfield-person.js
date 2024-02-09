/*
============================================
; Title:  brumfield-composer.js 
; Author: Professor Krasso
; Date: 7. February, 2024
; Modified by: Joanna Brumfield
; Description: Person RESTful API
;===========================================
*/

//Add a require statement for mongoose and assign it to a variable named mongoose.
const mongoose = require('mongoose');

//Add a new variable named Schema and assign it the mongoose.Schema object. 
const Schema = mongoose.Schema;

//Create a schema named roleSchema with the following fields: 
const roleSchema = new Schema({
    text: { type: String, required: true},
})

//Create a schema named dependentSchema with the following fields: 
// Field Name: firstName, Data Type: String, Schema: n/a, 
// Field Name: lastName, Data Type: String, Schema: n/a, 
const dependentSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true }
})

//Create a schema named personSchema with the following fields:
// Field Name: firstName, Data Type: String, Schema: n/a, 
// Field Name: lastName, Data Type: String, Schema: n/a, 
// Field Name: roles, Data Type: Array, Schema: roleSchema,
// Field Name: dependents, Data Type: Array, Schema: dependentSchema, 
// Field Name: birthDate, Data Type: String, Schema: n/a,
const personSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    birthDate: { type: String, required: true},
    roles: [roleSchema],
    dependents: [dependentSchema],
    
}, { collection: 'people' })


//Name the model “Person” and export it using module.exports
module.exports = mongoose.model('Person', personSchema);

