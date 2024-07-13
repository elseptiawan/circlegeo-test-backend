const Store = require('../models/Store');
const Validator = require('fastest-validator');
const { sendResponse, validationErrResponse } = require('../helpers/response');

const v = new Validator();

exports.createStore = async(req, res) => {
    const schema = {
        name : 'string',
        address : 'string',
        latitude : 'number',
        longitude : 'number',
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return validationErrResponse(res, "Request Validation Error", validate);
    }

    try {
        if (!req.isVerified){
            return sendResponse(res, 400, 'Your account is unverified. Please contact admin to verify your account');
        }
        const checkStore = await Store.findOne({ user_id: req.userId });
        if (checkStore){
            return sendResponse(res, 400, 'You have created your own store');
        }
        var store = new Store({
            user_id: req.userId,
            name: req.body.name,
            address: req.body.address,
            location: {
                type: 'Point',
                coordinates: [req.body.longitude, req.body.latitude]
            }
        
        });
        await store.save();
        sendResponse(res, 200, 'Success Create Store', store);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

exports.updateStore = async(req, res) => {
    const schema = {
        name : 'string',
        address : 'string',
        latitude : 'number',
        longitude : 'number',
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return validationErrResponse(res, "Request Validation Error", validate);
    }

    try {
        if (!req.isVerified){
            return sendResponse(res, 400, 'Your account is unverified. Please contact admin to verify your account');
        }
        var store = await Store.findOne({ user_id: req.userId });
        if (!store){
            return sendResponse(res, 400, 'You have not created your store. Please create your store first');
        }
        store.name = req.body.name;
        store.address = req.body.address;
        store.location = {
            type: 'Point',
            coordinates: [req.body.longitude, req.body.latitude]
        }
        await store.save();
        sendResponse(res, 200, 'Success Update Store', store);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

exports.getStore = async(req, res) => {
    try {
        var store = await Store.findOne({ user_id: req.userId });
        if (!store){
            return sendResponse(res, 400, 'You have not created your store. Please create your store first');
        }
        sendResponse(res, 200, 'Success Get Store', store);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}