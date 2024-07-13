const express = require('express');
const router = express.Router();
const { 
    getAllProducts,
    getNearbyProducts,
    checkoutOrder
} = require('../controllers/orderController');
const authorization = require('../middlewares/authorization');

router.get('/products', authorization('customer'), getAllProducts);
router.get('/products/nearby', authorization('customer'), getNearbyProducts);
router.post('/checkout', authorization('customer'), checkoutOrder);

module.exports = router;