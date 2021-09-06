const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema ({
    username: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model('users', loginSchema);