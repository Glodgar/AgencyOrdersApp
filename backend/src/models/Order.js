const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    nrZlecenia: {
        type: String,
        required: true
    },

    zleceniodawca: {
        type: String,
        require: true
    },

    nazwaZlecenia: {
        type: String,
        require: true,
    },

    dataZlecenia: {
        type: String,
        require: true
    },

    status: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    nrTelefonu: {
        type: String,
        require: true,
    },

    dataRealizacji: {
        type: String,
        require: true
    },

    materialy: {
        type: String,
        require: true,
    },

    wycena: {
        type: String,
        require: true,
    },

    wiadomosc: {
        type: String,
        require: true,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('order', OrderSchema);