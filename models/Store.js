const mongoose = require('mongoose');
const User = require('./User');

const store = mongoose.Schema({
    user_id:{
        required:true,
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    name:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
},
{
    timestamps:true
});

store.index({ location: '2dsphere' });

module.exports = mongoose.model("Store", store);