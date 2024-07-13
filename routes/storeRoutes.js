const express = require('express');
const router = express.Router();
const { 
    createStore,
    updateStore
} = require('../controllers/storeController');
const authorization = require('../middlewares/authorization');

router.post('/', authorization('seller'), createStore);
router.put('/', authorization('seller'), updateStore);

module.exports = router;