const User = require("../models/User");
const Clinic = require("../models/Clinic");
const Appointment = require("../models/Appointment");
const UserController = require("./users");

module.exports = {

    uploadRecord: async (reqObj, resObj) => {
        // overwrite if the role is something else other than patient
        
        recordObj = {
            name: reqObj.name,
            type: reqObj.recordType,
            desc: reqObj.desc,
            url: resObj.locals.recordObj.secure_url,
        }
        await User.updateOne(
            { _id: resObj.locals.user },
            { $push: { records: recordObj } }
        );
        return {
            success: true
        }
    },
    getAllRecords: async (patient) => {
        let userObj = await User.findOne({ _id: patient}).select({ "records": 1 });

        let appointments = await Appointment.find({ patient: patient })
                                 .populate("clinic", "-doctors -assistants")
                                 .populate("doctor", "name");
        
        return {
            appointments: appointments,
            records: userObj.records
        };
    },
    grantAccess: async(record, appointment) => {
        await Appointment.updateOne(
                { _id: appointment }, 
                { $push: { records: record } }
              );
        return {
            success: true
        }
    },
    revokeAccess: async(record, appointment) => {
        await Appointment.updateOne(
                { _id: appointment }, 
                { $pull: { records: record } }
              );
        return {
            success: true
        }
    }
}