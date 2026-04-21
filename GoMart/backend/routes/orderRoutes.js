const express = require('express');
const router = express.Router();
const { addOrderItems, verifyPayment, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.post('/verify', protect, verifyPayment);
router.get('/user', protect, getMyOrders);

module.exports = router;
