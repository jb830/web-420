/*
============================================
; Title:  brumfield-composer-routes.js 
; Author: Professor Krasso
; Date: 2. February, 2024
; Modified by: Joanna Brumfield
; Description: Composer Routes
;===========================================
*/

// Add the appropriate requirement statements (express, router, Composer)
const express = require('express');
const router = require('express.Router()');
const Composer = require('../models/brumfield-composers');

// Create a variable named router and assign it the express.Router() function. 
const router = express.Router();

// Create three operations: findAllComposers, findComposerById, createComposer

 /** 
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning a list of composer documents from MongoODB
 *     summary: return list of composer documents
 *     responses:
 *       '200':
 *         description: Array of composers
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers', async (req, res) => {
    try {
        Composer.find({}, function (err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.status(200).json(composers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

// findComposerById
/**
 *  * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document requested by user
 *       '404':
 *          description: Composer not found
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers/:id', (req, res) => {
    try {
        Composer.findById(req.params.id, (err, composer) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else if (!composer) {
                res.status(404).send({
                    'message': 'Composer not found'
                });
            } else {
                console.log(composer);
                res.status(200).json(composer);
            }
        });
    } catch (e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     summary: Creates a new Composer document
 *     requestBody:
 *       description: composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/composers', async (req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        await Composer.create(newComposer, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer)
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;