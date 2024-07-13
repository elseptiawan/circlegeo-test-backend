const express = require('express');
const router = express.Router();
const { 
    getUsers
} = require('../controllers/adminController');
const authorization = require('../middlewares/authorization');

router.get('/users/:role', authorization('admin'), getUsers);

module.exports = router;