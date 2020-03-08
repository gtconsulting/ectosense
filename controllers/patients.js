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
    }
}