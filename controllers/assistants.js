const User = require("../models/User");
const Clinic = require("../models/Clinic");
const Appointment = require("../models/Appointment");
var mongoose = require('mongoose');
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

    getAppointments: async (patient = null, assistant = null, clinic = null, doctor = null) => {
        let queryObj = {};
        // Use the same fun for both doctors & assistants
        patient ? queryObj['patient'] = patient : '';
        assistant ? queryObj['createdBy'] = assistant : '';
        clinic ? queryObj['clinic'] = clinic : '';
        doctor ? queryObj['doctor'] = doctor : '';

        // don't fetch patient records for assistants 
        // let patientPopulate = "-password " + (assistant ? "-records" : "");
        let appointments = await Appointment.find(queryObj)
        .populate("patient", "-password -records")
        .populate("doctor", "-password")
        .populate("clinic", "-doctors -assistants")
        .populate("createdBy", "-password")
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
        // don't fetch patient records for assistants 
        let patientPopulate = "-password " + (assistant ? "-records" : "");
        let appointmentObj = await Appointment.findOne(queryObj)
        .populate("patient", patientPopulate)
        .populate("doctor", "-password -records")
        .populate("clinic", "-doctors -assistants")
        .populate("createdBy", "-password -records");

        appointmentObj = JSON.parse(JSON.stringify(appointmentObj));
        
        if(!assistant){
            appointmentObj.patient.records = appointmentObj.patient.records.filter(obj => appointmentObj.records.indexOf(obj._id.toString())  !== -1);
        }
        delete appointmentObj.records;
        return appointmentObj;
    }
} 