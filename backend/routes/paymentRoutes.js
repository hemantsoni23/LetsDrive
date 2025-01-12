const express = require('express');
const router = express.Router();
const { createPayment, getPayments, updatePayment } = require('../controllers/paymentControllers');
const authUser = require('../middlewares/authUser');

// Create a payment order
router.post('/', authUser, createPayment);

// Update payment status
router.put('/:id', authUser, updatePayment);

// Get all payments for the logged-in user
router.get('/', authUser, getPayments);

module.exports = router;
