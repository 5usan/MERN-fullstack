const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('dashboard', dashboardSchema);