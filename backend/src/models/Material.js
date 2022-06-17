const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema({
    nazwa: {
        type: String,
        require: true
    },

    stan: {
        type: Boolean,
        require: true
    },
});

module.exports = mongoose.model('material', MaterialSchema);