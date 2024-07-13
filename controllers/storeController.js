const Store = require('../models/Store');
const Order = require('../models/Order');
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

exports.getOrders = async(req, res) => {
    try {
        var store = await Store.findOne({ user_id: req.userId });
        if (!store){
            return sendResponse(res, 400, 'You have not created your store. Please create your store first');
        }
        var orders = await Order.find(
            { 
                store_id: store.id ,
                status: 0
            });

        sendResponse(res, 200, 'Success Get Orders', orders);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

exports.sendOrder = async(req, res) => {
    const schema = {
        order_id : 'string',
    }
        
    const validate = v.validate(req.params, schema);
        
    if (validate.length){
        return validationErrResponse(res, "Request Validation Error", validate);
    }

    if (req.params.order_id.length !== 24){
        return sendResponse(res, 400, 'Invalid Order ID');
    }

    try {
        var store = await Store.findOne({ user_id: req.userId });
        if (!store){
            return sendResponse(res, 400, 'You have not created your store. Please create your store first');
        }
        var order = await Order.findOne({ store_id: store.id, _id: req.params.order_id });
        if (!order){
            return sendResponse(res, 400, 'Order not found');
        }
        if (order.status !== 0){
            return sendResponse(res, 400, 'Order already sent');
        }
        order.status = 1;
        await order.save();
        sendResponse(res, 200, 'Success Send Order');
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}