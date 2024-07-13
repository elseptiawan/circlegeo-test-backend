const express = require('express');
const router = express.Router();
const { 
    login,
    registerCustomer,
    registerSeller
 } = require('../controllers/authController');

router.post('/login', login);
router.post('/register/customer', registerCustomer);
router.post('/register/seller', registerSeller);

module.exports = router;