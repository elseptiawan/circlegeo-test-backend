const User = require('../models/User');
const Validator = require('fastest-validator');
const { sendResponse, validationErrResponse } = require('../helpers/response');

const v = new Validator();

exports.getUsers = async(req, res) => {
    try {
        let where = {
            role: req.params.role
        }
        if (req.query.isVerified) {
            where.isVerified = req.query.isVerified;
        }
        var users = await User.find(where);
        sendResponse(res, 200, 'Success Get Users', users);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

exports.veryfyUser = async(req, res) => {
    if (req.params.id.length !== 24){
        return sendResponse(res, 400, 'Invalid User ID');
    }
    try {
        var user = await User.findById(req.params.id);
        if (!user){
            return sendResponse(res, 400, 'User not found');
        }
        if (user.isVerified){
            return sendResponse(res, 400, 'User already verified');
        }
        user.isVerified = true;
        await user.save();
        sendResponse(res, 200, 'User Verified');
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}