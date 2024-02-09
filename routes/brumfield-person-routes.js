/*
============================================
; Title:  brumfield-person-routes.js 
; Author: Professor Krasso
; Date: 2. February, 2024
; Modified by: Joanna Brumfield
; Description: Person Routes
;===========================================
*/

//Add the appropriate requirement statements (express, router, and Person).
const express = require('express');
const Person = require('../models/brumfield-person');

// Create a variable named router and assign it the express.Router() function. 
const router = express.Router();

//Create two operations: findAllPersons and createPerson
/** 
 * findAllPersons
 * @openapi
 * /api/people:
 *   get:
 *     tags:
 *       - Person
 *     description: API for returning a list of Person documents from MongoODB
 *     summary: return list of Person documents
 *     responses:
 *       '200':
 *         description: Array of Person names
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find({});
        res.json(persons);
    } catch (e) {
        if (e) {
            res.status(501).send({
                'message': `MongoDB Exception: ${e.message}`
            });
        } else {
            res.status(500).send({
                'message': `Server Exception: ${e.message}`
            });
        }
    }
});

/**
 * createPerson
 * @openapi
 * /api/people:
 *   post:
 *     tags:
 *       - Person
 *     name: createPerson
 *     summary: Create a new person
 *     requestBody:
 *       description: Add a person to person list
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - roles
 *               - dependents 
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *     responses:
 *       '200':
 *         description: Person was added to person list
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/', async (req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            roles: req.body.roles,
            dependents: req.body.dependents
        }
        const person = await Person.create(newPerson)
        console.log(person);
        res.status(200).json(person)

    } catch (e) {
        if (e) {
            console.log(e);
            res.status(500).send({
                'message': `Server Exception: ${e.message}`
            })
        } else {
            console.log(err);
            res.status(501).send({
                'message': `MongoDB Exception: ${e.message}`
            })
        }
    }
})

module.exports = router;