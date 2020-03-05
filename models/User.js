const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        require: true,
        default: 'patient'
    }
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);

module.exports = User;