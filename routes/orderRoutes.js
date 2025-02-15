const express = require('express');
const router = express.Router();
const { 
    getAllProducts,
    getNearbyProducts,
    checkoutOrder,
    getMyOrders,
    finishOrder
} = require('../controllers/orderController');
const authorization = require('../middlewares/authorization');

router.get('/products', authorization('customer'), getAllProducts);
router.get('/products/nearby', authorization('customer'), getNearbyProducts);
router.post('/checkout', authorization('customer'), checkoutOrder);
router.get('/me', authorization('customer'), getMyOrders);
router.put('/finish/:order_id', authorization('customer'), finishOrder);

module.exports = router;