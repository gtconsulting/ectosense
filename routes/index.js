const express = require("express");

const router = express.Router();

const passport = require("passport");
const userController = require("../controllers/users");
const sendError = require("../services/sendError");

  
router.get("/", (req, res) => res.send("Welcome"));

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

router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => res.send("Success"));

module.exports = router;