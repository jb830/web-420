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
const Composer = require('../models/brumfield-composer');

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
 *         description: Array of composer names
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/', async (req, res) => {
    try {
        const composers = await Composer.find({});
        res.json(composers);
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
 *  * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:   Returns composer by id
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
router.get('/:id', async (req, res) => {
    try {
        const composer = await Composer.findById(req.params.id).exec();
        if (!composer) {
            res.status(404).send({
                'message': 'Composer not found'
            });
        } else {
            res.status(200).json(composer);
        }
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
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     summary: Create a new composer
 *     requestBody:
 *       description: Add a composer to composer list
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
 *         description: Composer was added to composer list
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/', async (req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        const composer = await Composer.create(newComposer)
        console.log(composer);
        res.status(200).json(composer)

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

/**
 *  * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     description:   Update composer by id
 *     summary: updates and retruns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '401':
 *          description: Invalid composerId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.put('/:id', async (req, res) => {
    try {
        //Query the composers collection using the findOne() function and the RequestParams id on the Composer model.
        const composer = await Composer.findOne({
            _id: req.params.id
        }).exec();
        //if(!composer) Return a status 401 and the specified error message.
        if (!composer) {
            res.status(401).send({
                'message': 'Invalid composerId'
            });
            //if (composer) Update the returned composer object by using the set() function 
            //and mapping the RequestBody fields to the returned objects parameters.
        } else {
            composer.set(req.body)

            //Call the save() function on the returned composer object and return the savedComposer object.
            await composer.save();
            res.status(200).json(composer);
        }
    } catch (e) {
        if (e) {
            res.status(501).send({
                'message': `MongoDB Exception: ${e.message}`
            });
        } else if (err) {
            res.status(500).send({
                'message': `Server Exception: ${err.message}`
            });
        }
    }
});

/**
 *  * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     description:   Deletes composer by id
 *     summary: deletes a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/:id', async (req, res) => {
    try {
        //Call the findByIdAndDelete() function on the Composer model 
        //and use the RequestParams id as the filter criteria.
        const composer = await Composer.findByIdAndDelete({
            _id: req.params.id
        }).exec();
        //Either return the deleted composer document or the appropriate message depending on the status code.
        res.status(200).json(composer);

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

module.exports = router;