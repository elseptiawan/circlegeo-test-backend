const mongoose = require('mongoose');
const Store = require('./Store');
const Product = require('./Product');
const User = require('./User');

const order = mongoose.Schema({
    store_id:{
        required:true,
        type:mongoose.Types.ObjectId,
        ref: 'Store'
    },
    product_id:{
        required:true,
        type:mongoose.Types.ObjectId,
        ref: 'Product'
    },
    user_id:{
        required:true,
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    total_price:{
        required:true,
        type:Number
    },
    qty:{
        required:true,
        type:Number
    },
    status:{
        required:true,
        type:Number,
        enum: [0,1,2],
        default: 0
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("Order", order);