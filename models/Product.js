const mongoose = require('mongoose');
const Store = require('./Store');

const product = mongoose.Schema({
    store_id:{
        required:true,
        type:mongoose.Types.ObjectId,
        ref: 'Store'
    },
    name:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:Number
    },
    description:{
        required:true,
        type:String
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("Product", product);