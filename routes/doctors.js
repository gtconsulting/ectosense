const express = require("express");
const acl = require('express-acl');

const router = express.Router();

const passport = require("passport");
const sendError = require("../services/sendError");
const { auth } = require("../middlewares/auth");
const assistantController = require("../controllers/assistants");

// All the routes below this middleware will be protected with token
router.use((req, res, next) => auth(req, res, next));
router.use(acl.authorize);

// Get all the appointments of a specific user
router.get("/appointments/:user", async (req, res, next) => {
    try{
        let appointments = await assistantController.getAppointments(req.params.user, null, res.locals.clinic);
        res.send(appointments);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

// Get specific appointment of that clinic to which the doctor is tiedup with
// res.locals will be set in auth
router.get("/appointment/:appointment", async (req, res, next) => {
    try{
        let appointment = await assistantController.getAppointment(req.params.appointment, null, res.locals.clinic);
        res.send(appointment);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

// Get all the appointments of the doctor
router.get("/appointments", async (req, res, next) => {
    try{
        let appointments = await assistantController.getAppointments(null, null, null, res.locals.user);
        res.send(appointments);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

module.exports = router;