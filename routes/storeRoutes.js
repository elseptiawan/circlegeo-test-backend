const express = require('express');
const router = express.Router();
const { 
    createStore,
    updateStore,
    getStore,
    getOrders
} = require('../controllers/storeController');
const authorization = require('../middlewares/authorization');

router.post('/', authorization('seller'), createStore);
router.put('/', authorization('seller'), updateStore);
router.get('/', authorization('seller'), getStore);
router.get('/orders', authorization('seller'), getOrders);

module.exports = router;