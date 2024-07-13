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