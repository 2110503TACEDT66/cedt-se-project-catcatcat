const express = require('express');
const {getPremiumTransactions, getPremiumTransaction, addPremiumTransaction, deletePremiumTransaction} = require('../controllers/premiumtransactions');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getPremiumTransactions).post(protect, authorize('admin', 'user', 'premium'), addPremiumTransaction);
router.route('/:id').get(protect, authorize('admin', 'user', 'premium'), getPremiumTransaction).delete(protect, authorize('admin', 'user', 'premium'), deletePremiumTransaction);

module.exports = router;


/**
* @swagger
* /premiumtransactions:
*   get:
*     summary: Returns the list of all Premium Transactions
*     tags: [Premium Transactions]
*     responses:
*       200:
*         description: The list of the Premium Transactions
*         content:
*           application/json:
*             schema:
*             type: array
*             items:
*               $ref: '#/components/schemas/PremiumTransaction'
*/

/**
* @swagger
* /premiumtransactions/{id}:
*   get:
*     summary: Get the Premium Transaction by id
*     tags: [Premium Transactions]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The premium transaction id
*     responses:
*       200:
*         description: The Premium Transaction description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PremiumTransaction'
*       404:
*         description: No Premium Transaction with the reservation id
*/

/**
* @swagger
* /premiumtransactions:
*   post:
*     summary: Create a new premium transaction
*     tags: [Premium Transactions]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/PremiumTransaction'
*     responses:
*       201:
*         description: The premiumtransaction was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PremiumTransaction'
*       500:
*         description: Cannot create premium transaction
*/