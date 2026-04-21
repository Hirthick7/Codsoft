const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc Create new order & Razorpay order
// @route POST /api/orders
// @access Private
const addOrderItems = async (req, res) => {
    const { items, totalAmount } = req.body;

    if (items && items.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }

    try {
        // Create Razorpay Order
        const options = {
            amount: Math.round(totalAmount * 100), // amount in paisa
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Create Order in DB
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            paymentResult: {
                id: razorpayOrder.id,
                status: 'Created'
            }
        });

        const createdOrder = await order.save();

        res.status(201).json({
            order: createdOrder,
            razorpayOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

// @desc Verify payment & update order
// @route POST /api/orders/verify
// @access Private
const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        try {
            const order = await Order.findById(orderId);
            if (order) {
                order.status = 'Paid';
                order.paymentResult = {
                    id: razorpay_payment_id,
                    status: 'Success',
                    update_time: new Date().toISOString()
                };
                const updatedOrder = await order.save();
                res.json({ message: "Paid successfully", order: updatedOrder });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating order' });
        }
    } else {
        res.status(400).json({ message: "Invalid signature" });
    }
};

// @desc Get logged in user orders
// @route GET /api/orders/user
// @access Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

module.exports = { addOrderItems, verifyPayment, getMyOrders };
