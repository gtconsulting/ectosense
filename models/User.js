const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    ],
    clinic: {
        type: Schema.Types.ObjectId,
        ref: "clinic",
        require: true
    }
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);

module.exports = User;