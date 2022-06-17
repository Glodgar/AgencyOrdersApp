const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    rola: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('role', RoleSchema);