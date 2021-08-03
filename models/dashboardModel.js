const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    //Works like foreign key
    //Used for linking database connections
    // ref: takes in the collection name 
    // type: takes in the type of user which is an ObjectId
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup'
    },

    image: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('dashboard', dashboardSchema);