const mongoose = require('mongoose');

const user = mongoose.Schema({
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    role:{
        required:true,
        type:String
    },
    isVerified:{
        required:true,
        type: Boolean,
        default: false 
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("User", user);