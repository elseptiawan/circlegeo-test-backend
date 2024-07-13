const express = require('express');
const router = express.Router();
const { 
    getUsers,
    veryfyUser
} = require('../controllers/adminController');
const authorization = require('../middlewares/authorization');

router.get('/users/:role', authorization('admin'), getUsers);
router.put('/verify/:id', authorization('admin'), veryfyUser);

module.exports = router;