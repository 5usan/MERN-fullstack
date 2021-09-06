const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    username:{
        type: String,
        require: false,
    },

    name:{
        type: String,
        require: false
    },

    address:{
        type: String,
        require: false
    },

    phone_number:{
        type: Number,
        require: false
    },

    password:{
        type: String,
        require: false
    }
}, {timestamps: true});

module.exports = mongoose.model('signup', signupSchema);