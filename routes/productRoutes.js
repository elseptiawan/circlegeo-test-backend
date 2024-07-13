const express = require('express');
const router = express.Router();
const { 
    createProduct,
    updateProduct,
    getProducts,
    getProduct
} = require('../controllers/productController');
const authorization = require('../middlewares/authorization');

router.post('/', authorization('seller'), createProduct);
router.put('/:id', authorization('seller'), updateProduct);
router.get('/', authorization('seller'), getProducts);
router.get('/:id', authorization('seller'), getProduct);

module.exports = router;