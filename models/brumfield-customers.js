/*
============================================
; Title:  brumfield-customers.js 
; Author: Professor Krasso
; Date: 24, February, 2024
; Modified by: Joanna Brumfield
; Description: customer RESTful API
;===========================================
*/

//Add a require statement for mongoose and assign it to a variable named mongoose.
const mongoose = require('mongoose');

//Add a new variable named Schema and assign it the mongoose.Schema object. 
const Schema = mongoose.Schema;

//Create a schema named lineItemSchema with the following fields:  
const lineItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const invoiceSchema = new Schema({
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    dateCreated: { type: String, required: true },
    dateShipped: { type: String, required: true },
    lineItems: [lineItemSchema]
});

const customerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    invoices: [invoiceSchema]
});

//Name the model “Customer” and export it using module.exports
module.exports = mongoose.model('Customer', customerSchema);