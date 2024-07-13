const Product = require('../models/Product');
const Store = require('../models/Store');
const Validator = require('fastest-validator');
const { sendResponse, validationErrResponse } = require('../helpers/response');

const v = new Validator();

exports.createProduct = async(req, res) => {
    const schema = {
        name : 'string',
        price : 'number',
        stock : 'number',
        description: "string"
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return validationErrResponse(res, "Request Validation Error", validate);
    }

    try {
        const store = await Store.findOne({ user_id: req.userId });
        if (!store){
            return sendResponse(res, 400, 'You have not created your store. Please create your store first');
        }
        var product = new Product({
            store_id: store.id,
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description
        });
        await product.save();
        sendResponse(res, 200, 'Success Create Product', product);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

exports.updateProduct = async(req, res) => {
    const schema = {
        name : 'string',
        price : 'number',
        stock : 'number',
        description: "string"
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return validationErrResponse(res, "Request Validation Error", validate);
    }

    try {
        const store = await Store.findOne({ user_id: req.userId });
        if (!store){
            return sendResponse(res, 400, 'You have not created your store. Please create your store first');
        }
        var product = await Product.findOne({
            store_id: store.id,
            _id: req.params.id
        });
        if (!product){
            return sendResponse(res, 400, 'Product not found');
        }
        product.name = req.body.name;
        product.price = req.body.price;
        product.stock = req.body.stock;
        product.description = req.body.description;
        await product.save();
        sendResponse(res, 200, 'Success Update Product', product);
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}