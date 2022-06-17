const mongoose = require('mongoose');

const ActionSchema = mongoose.Schema({
    nazwa: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('action', ActionSchema);