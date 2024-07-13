const Product = require('../models/Product');
const Store = require('../models/Store');
const Order = require('../models/Order');
const Validator = require('fastest-validator');
const { sendResponse, validationErrResponse } = require('../helpers/response');
const mongoose = require('mongoose');

const v = new Validator();

exports.getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        sendResponse(res, 200, 'Success Get Products', products);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

exports.getNearbyProducts = async(req, res) => {
    const schema = {
        latitude : 'string',
        longitude : 'string',
    }
        
    const validate = v.validate(req.query, schema);
        
    if (validate.length){
        return validationErrResponse(res, "Request Validation Error", validate);
    }

    try {
        const store = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [req.query.longitude, req.query.latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        if (!store.length){
            return sendResponse(res, 400, 'No products arround you');
        }

        storeIds = [];
        for (let i = 0; i < store.length; i++) {
            storeIds.push(store[i].id);
        }
        const products = await Product.find({
            store_id: {
                $in: storeIds
            }
        });
        if (!products.length){
            return sendResponse(res, 400, 'No products arround you');
        }
        sendResponse(res, 200, 'Success Get Nearby Products', products);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

exports.checkoutOrder = async(req, res) => {
    const schema = {
        product_id : 'string',
        qty: 'number',
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return validationErrResponse(res, "Request Validation Error", validate);
    }

    try {
        const product = await Product.findById(req.body.product_id);
        if (!product){
            return sendResponse(res, 400, 'Product not found');
        }
        if (product.stock < req.body.qty){
            return sendResponse(res, 400, 'Product out of stock');
        }
        product.stock -= req.body.qty;

        await product.save();

        const order = new Order({
            product_id: req.body.product_id,
            qty: req.body.qty,
            user_id: req.userId,
            store_id: product.store_id,
            total_price: product.price * req.body.qty
        });
        await order.save();

        sendResponse(res, 200, 'Success Checkout Order', order);
    } catch (error) {
        sendResponse(res, 500, error);
    }
}
