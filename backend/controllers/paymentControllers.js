const Razorpay = require('razorpay');
const Payment = require('../models/payment');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new payment order
const createPayment = async (req, res) => {
    const { amount, currency, receipt, customization } = req.body;

    if (!amount || !currency || !receipt) {
        return res.status(400).json({ error: 'Amount, currency, and receipt are required.' });
    }

    try {
        const order = await instance.orders.create({ amount, currency, receipt });

        if (!order) {
            return res.status(400).json({ error: 'Failed to create order with Razorpay.' });
        }

        // Save order details in the database
        const payment = await Payment.create({
            user_email: req.user.email,
            amount:amount/100,
            currency,
            receipt,
            order_id: order.id,
            status: order.status,
            customization
        });

        res.status(201).json(payment);
    } catch (error) {
        console.error('Create Payment Error:', error);  
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get payments for the authenticated user
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            where: { user_email: req.user.email },
            attributes: ['order_id', 'status', 'description'],
        });
        res.status(200).json(payments);
    } catch (error) {
        console.error('Get Payments Error:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
};

// Update payment details
const updatePayment = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const {
        status,
        description,
        razorpay_signature,
        failure_reason,
        payment_id,
    } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Payment status is required.' });
    }

    try {
        const payment = await Payment.findOne({ where: { order_id:id } });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found or unauthorized.' });
        }

        // Update payment details
        payment.status = status;
        if (description) payment.description = description;
        if (razorpay_signature) payment.razorpay_signature = razorpay_signature;
        if (failure_reason) payment.failure_reason = failure_reason;
        if (payment_id) payment.payment_id = payment_id;

        await payment.save();

        res.json(payment);
    } catch (error) {
        console.error('Update Payment Error:', error);
        res.status(500).json({ error: 'Failed to update payment details' });
    }
};


module.exports = { createPayment, getPayments, updatePayment };
