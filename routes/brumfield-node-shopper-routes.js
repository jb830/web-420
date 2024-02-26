/*
============================================
; Title:  brumfield-node-sopper-route.js 
; Author: Professor Krasso
; Date: 14. February, 2024
; Modified by: Joanna Brumfield
; Description: node-sopper-routes Routes
;===========================================
*/

// Add the appropriate requirement statements (express, router, bcrypt)
const express = require('express');
const Customer = require('../models/brumfield-customers');

// Create a variable named router and assign it the express.Router() function. 
const router = express.Router();

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customer
 *     name: createCustomer
 *     summary: Create a new customer
 *     requestBody:
 *       description: Add a customer document to customers list
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer was added to customers list
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/', async (req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username
        }
        const customer = await Customer.create(newCustomer)
        console.log(customer);
        res.status(200).json(customer)

    } catch (e) {
        if (e) {
            console.log(e);
            res.status(500).send({
                'message': `Server Exception: ${e.message}`
            })
        } else if (err) {
            console.log(err);
            res.status(501).send({
                'message': `MongoDB Exception: ${err}`
            });
        }
    }
});
/** 
* createInvoiceByusername
* @openapi
/api/customers/{username}/invoices:
*  post:
*    tags:
*      - Customer
*    summary: Creates a new invoice for customer by username
*    description: Add a customer invoice to customer collection
*    parameters:
*      - name: username
*        in: path
*        required: true
*        schema:
*          type: string
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            required:
*              - subtotal
*              - tax
*              - dateCreated
*              - dateShipped
*              - lineItems
*            properties:
*              subtotal:
*                type: number
*              tax:
*                type: number
*              dateCreated:
*                type: string
*              dateShipped:
*                type: string
*              lineItems:
*                type: array
*                items:
*                  type: object
*                  properties:
*                    name:
*                      type: string
*                    price:
*                      type: number
*                    quantity:
*                      type: number
*    responses:
*      '200':
*        description: Customer Invoice was added to customers list
*      '404':
*        description: Customer username not found
*      '500':
*        description: Server Exception
*      '501':
*        description: MongoDB Exception
*/
router.post('/:username/invoices', async (req, res) => {
    try {
        //Query the customers collection using the findOne() function and the username from the RequestParams object.
        const customer = await Customer.findOne({
            username: req.params.username
        });
        if (!customer) {
            return res.status(404).send({
                'message': 'customer username not found'
            });
        }
        //Create an object literal named newInvoice and map the values from the RequestBody to its properties.  
        const newInvoice = {
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems,
        };

        //Call the push() function off of the invoices array and pass-in the newInvoice object literal. 
        // customer.invoices.push(newInvoice);
        await Customer.updateOne({ username: req.params.username }, { $push: { invoices: newInvoice } });


        //Call the save() function on the Customer model and save the results to MongoDB. 
        await customer.save();

        console.log(newInvoice);
        res.status(200).json(newInvoice);

    } catch (e) {
        console.log(e);
        res.status(500).send({ 'message': `Server Exception: ${e.message}` });
    }
});

/**
 *  * findAllInvoicesByusername
 * @openapi
/api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns invoice by customer username
 *     summary: returns a customer document
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: customer username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Invoice document requested by user
 *       '404':
 *          description: Username not found
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/:username/invoices', async (req, res) => {
    try {
        const customer = await Customer.findOne({
            username: req.params.username
        });

        console.log('Requested username:', req.params.username);

        if (customer) {
            res.status(200).json(customer.invoices);
        } else {
            res.status(404).send({
                'message': 'customer username not found'
            });
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


module.exports = router;