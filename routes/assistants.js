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

router.post("/create/appointment", async (req, res, next) => {
    try{
        let appointment = await assistantController.createAppointment(req.body, res);
        res.send(appointment);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.get("/appointments/:patient", async (req, res, next) => {
    try{
        let appointments = await assistantController.getAppointments(req.params.patient, res.locals.user);
        res.send(appointments);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.get("/appointment/:appointment", async (req, res, next) => {
    try{
        let appointment = await assistantController.getAppointment(req.params.appointment, res.locals.user);
        res.send(appointment);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

// Get all the appointments of the assistant
router.get("/appointments", async (req, res, next) => {
    try{
        let appointments = await assistantController.getAppointments(null, res.locals.user, null, null);
        res.send(appointments);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});


module.exports = router;