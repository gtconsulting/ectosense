const express = require("express");
const acl = require('express-acl');

const router = express.Router();

const passport = require("passport");
const sendError = require("../services/sendError");
const { auth } = require("../middlewares/auth");
const adminController = require("../controllers/admin");

// All the routes below this middleware will be protected with token
router.use((req, res, next) => auth(req, res, next));
router.use(acl.authorize);

router.post("/clinic/create", async (req, res, next) => {
    try{
        let newClinic = await adminController.createClinic(req.body);
        res.send(newClinic);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.post("/clinic/create/user", async (req, res, next) => {
    try{
        let user = await adminController.createUser(req.body);
        // Trigger an email to the doctor with verification/password
        res.send(user);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

module.exports = router;