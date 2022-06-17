const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const UserSchema = mongoose.Schema({
    imie: {
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        // match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    nrTelefonu: {
        type: String,
        required: true
    },
    rola: {
        type: String,
        required: true
    },
    dataUtworzenia: {
        type: String,
        required: true
    },
    dataModyfikacji: {
        type: String,
    },
    haslo: {
        type: String,
        required: true,
        select: false
    }
});

UserSchema.pre('save', function(next) {
    this.haslo = bcrypt.hashSync(this.haslo, saltRounds);
    next();
});

module.exports = mongoose.model('user', UserSchema);