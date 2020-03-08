const User = require("../models/User");
const Clinic = require("../models/Clinic");
var mongoose = require('mongoose');
const UserController = require("./users");

module.exports = {
    createClinic: (reqObj) => {
        return Clinic.create(reqObj);
    },
    createUser: async (reqObj) => {
        // Create doctor/assistant
        let user = await UserController.register(reqObj);
        // Async update
        let udpateObj = {};
        // role is singular whereas it's plural for clinics model
        udpateObj[reqObj.role + "s"] = user._id;
        await Clinic.updateOne(
            { _id: reqObj.clinic },
            { $push: udpateObj }
        );
        
        await User.updateOne(
            { _id: user._id },
            { clinic: reqObj.clinic }
        );
        
        return user;
    }
}