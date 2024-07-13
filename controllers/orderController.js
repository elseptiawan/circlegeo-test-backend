const Product = require('../models/Product');
const Store = require('../models/Store');
const Validator = require('fastest-validator');
const { sendResponse, validationErrResponse } = require('../helpers/response');

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