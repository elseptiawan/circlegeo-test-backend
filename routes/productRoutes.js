const express = require('express');
const router = express.Router();
const { 
    createProduct,
    updateProduct
} = require('../controllers/productController');
const authorization = require('../middlewares/authorization');

router.post('/', authorization('seller'), createProduct);
router.put('/:id', authorization('seller'), updateProduct);

module.exports = router;