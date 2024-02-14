/*
============================================
; Title:  brumfield-session-routes.js 
; Author: Professor Krasso
; Date: 14. February, 2024
; Modified by: Joanna Brumfield
; Description: Session Routes
;===========================================
*/

// Add the appropriate requirement statements (express, router, bcrypt)
const express = require('express');
const Composer = require('../models/brumfield-users');
const bcrypt = require('bcryptjs');

// Create a variable named router and assign it the express.Router() function. 
const router = express.Router();
