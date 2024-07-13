const express = require('express');
const router = express.Router();
const { 
    getAllProducts,
    getNearbyProducts
} = require('../controllers/orderController');
const authorization = require('../middlewares/authorization');

router.get('/products', authorization('customer'), getAllProducts);
router.get('/products/nearby', authorization('customer'), getNearbyProducts);

module.exports = router;