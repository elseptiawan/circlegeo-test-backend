const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const Validator = require('fastest-validator');
const { sendResponse } = require('../helpers/response');

const v = new Validator();

exports.login = async(req, res) => {
    const schema = {
        email : 'email',
        password : 'string|min:6'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try {
        var user = await User.findOne({ email: req.body.email });

        if (!user){
            return sendResponse(res, 400, 'Email or Password does not match');
        }
        const match = await bcrypt.compareSync(req.body.password, user.password);
        if(!match) return sendResponse(res, 400, 'Email or Password does not match');
        const userId = user.id;
        const email = user.email;
        const role = user.role;

        const token = jwt.sign({userId, email, role}, process.env.API_KEY, {
            expiresIn: '86400s'
        });
        
        sendResponse(res, 200, 'Login successful', {token});
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}