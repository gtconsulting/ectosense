const express = require("express");

const router = express.Router();

const passport = require("passport");
const sendError = require("../services/sendError");

router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => res.send("Success"));

module.exports = router;