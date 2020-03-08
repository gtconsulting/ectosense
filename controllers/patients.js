const User = require("../models/User");
const Clinic = require("../models/Clinic");
const Appointment = require("../models/Appointment");
const UserController = require("./users");

module.exports = {

    createAppointment: async (reqObj, res) => {
        // overwrite if the role is something else other than patient
        reqObj.role = "patient";
        let user = await User.findOne({ email: reqObj.email });
        if(!user) {
            user = await UserController.register(reqObj);
        }
        
        let appointmentObj = {
            patient: user._id,
            doctor: reqObj.doctor,
            clinic: reqObj.clinic,
            address: reqObj.address,
            createdBy: res.locals.user
        }
        let appointment = await Appointment.create(appointmentObj);
        
        return appointment;
    },

    getAppointments: async (patient, assistant = null, clinic = null) => {
        let queryObj = {
            patient: patient
        };
        // Use the same fun for both doctors & assistants
        assistant ? queryObj['createdBy'] = assistant : '';
        clinic ? queryObj['clinic'] = clinic : '';
        let appointments = await Appointment.find(queryObj)
        .populate("patient", "-password -records")
        .populate("doctor", "-password")
        .populate("clinic", "-doctors -assistants")
        .sort({ "createdAt": -1 }).exec();
        
        return appointments;
    },

    getAppointment: async (appointment, assistant = null, clinic = null) => {
        let queryObj = {
            _id: appointment
        };
        // Use the same fun for both doctors & assistants
        assistant ? queryObj['createdBy'] = assistant : '';
        clinic ? queryObj['clinic'] = clinic : '';
        let appointmentObj = await Appointment.findOne(queryObj)
        .populate("patient", "-password -records")
        .populate("doctor", "-password")
        .populate("clinic", "-doctors -assistants");
        
        return appointmentObj;
    }
}