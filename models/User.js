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
    },
    records: [
        {
            name: {
                type: String
            },
            type: {
                type: String
            },
            desc: {
                type: String
            },
            url: {
                type: String
            }
        }
    ]
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);

module.exports = User;