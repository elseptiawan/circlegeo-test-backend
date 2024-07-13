const express = require('express');
const router = express.Router();
const { 
    createStore
} = require('../controllers/storeController');
const authorization = require('../middlewares/authorization');

router.post('/', authorization('seller'), createStore);

module.exports = router;