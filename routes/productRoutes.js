const express = require('express');
const router = express.Router();
const { 
    createProduct
} = require('../controllers/productController');
const authorization = require('../middlewares/authorization');

router.post('/', authorization('seller'), createProduct);

module.exports = router;