const express = require("express");
const acl = require('express-acl');

const router = express.Router();

const passport = require("passport");
const sendError = require("../services/sendError");
const { auth } = require("../middlewares/auth");
const assistantController = require("../controllers/assistants");
const patientController = require("../controllers/patients");

const multer = require("multer");
const upload = multer({ dest: 'public/records' });

const dotenv = require('dotenv');
dotenv.config();

var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});  


// All the routes below this middleware will be protected with token
router.use((req, res, next) => auth(req, res, next));
router.use(acl.authorize);

router.get("/appointments", async (req, res, next) => {
    try{
        let appointments = await assistantController.getAppointments(res.locals.user);
        res.send(appointments);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.get("/appointment/:appointment", async (req, res, next) => {
    try{
        let appointment = await assistantController.getAppointment(res.locals.user);
        res.send(appointment);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.post("/record", upload.single('record'), 
    (req, res, next) => {
        cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' },
            function(err, result) {
                if(err){
                    next(err);
                }
                res.locals.recordObj = result;
                next();
            }
        );
    },
    async (req, res, next) => {
    try{
        await patientController.uploadRecord(req.body, res);
        res.send(res.locals.recordObj);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.get("/records", async (req, res, next) => {
    try{
        let records = await patientController.getAllRecords(res.locals.user);
        res.send(records);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

// Record will be shared with a specific appointment which is accessible to all the doctors of a clinic
router.get("/records/grant-access/:record/:appointment", async (req, res, next) => {
    try{
        let update = await patientController.grantAccess(req.params.record, req.params.appointment);
        res.send(update);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.get("/records/revoke-access/:record/:appointment", async (req, res, next) => {
    try{
        let update = await patientController.revokeAccess(req.params.record, req.params.appointment);
        res.send(update);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});


module.exports = router;