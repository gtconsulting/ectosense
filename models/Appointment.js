const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
    
    patient: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    clinic: {
        type: Schema.Types.ObjectId,
        ref: "clinic",
        require: true
    },
    address: {
        type: String,
        require: true
    },
    records: [{
        type: Schema.Types.ObjectId
    }]
}, { timestamps: true });

const Appointment = mongoose.model("appointment", AppointmentSchema);

module.exports = Appointment;