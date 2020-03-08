const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User");

const ClinicSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    doctors: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    assistants: [{
        type: Schema.Types.ObjectId,
        ref: "users"
      }]
}, { timestamps: true });

const Clinic = mongoose.model("clinic", ClinicSchema);

module.exports = Clinic;