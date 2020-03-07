const express = require("express");
// const acl = require('express-acl');

const router = express.Router();

// const passport = require("passport");
const userController = require("../controllers/users");
const sendError = require("../services/sendError");

router.post("/register", async (req, res, next) => {
    try{
        let newUser = await userController.register(req.body);
        res.send(newUser);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

router.post("/login", async (req, res, next) => {
    try{
        userController.login(req, res);
    }
    catch (error){
        sendError(error, req, res, next);
    }
});

module.exports = router;