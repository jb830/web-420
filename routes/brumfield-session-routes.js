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
const User = require('../models/brumfield-users');
const bcrypt = require('bcryptjs');

// Create a variable named router and assign it the express.Router() function. 
const router = express.Router();

//Add a variable named saltRounds with an integer value of 10
var saltRounds = 10;

//Create two operations: signup and login
//Path: /api/signup
/**
 * createUser
 * @openapi
 * /api/users/signup:
 *   post:
 *     tags:
 *       - User
 *     name: createUser
 *     summary: Create a new user if userName is not already in use
 *     requestBody:
 *       description: Add a user to users list if userName does not exist
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User was added to users list
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signup', async (req, res) => {
    try {
        //see if username exists
        const user = await User.findOne({
            userName: req.body.userName
        });
        //if username does not exist create a new user and hash the password input
        if (!user) {
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

            const newRegisteredUser = {
                userName: req.body.userName,
                password: hashedPassword,
                emailAddress: req.body.emailAddress,
            }
            const user = await User.create(newRegisteredUser)
            console.log(user);
            res.status(200).json({
                'message': `New user was added to users collection`
            });
        //if username exists send 401   
        } else {
            res.status(401).send({
                'message': `Username is already in use`
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});

/**
 * login
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - Login
 *     name: login
 *     summary: Verifies users credentials 
 *     requestBody:
 *       description: UserName and password
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName
        });
        //check if username exists
        if (user) {
            //if username exists check if password matches 
            bcrypt.compare(req.body.password, user.password, function (err, passwordIsValid) {
                if (err) {
                    console.log(err);
                    return res.status(501).send({
                        'message': `MongoDB Exception: ${err.message}`
                    });
                }
                //if password matches log user in
                if (passwordIsValid) {
                    console.log(user);
                    res.status(200).json({
                        'message': 'User logged in'
                    });
                    //if password doesnt match send 401 error    
                } else {
                    res.status(401).send({
                        'message': 'Invalid username and/or password'
                    });
                }
            });
            //if username doesnt exist send 401 
        } else {
            res.status(401).send({
                'message': 'Invalid username and/or password'
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});

module.exports = router;