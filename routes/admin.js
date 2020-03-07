const express = require("express");
const acl = require('express-acl');

const router = express.Router();

const passport = require("passport");
const sendError = require("../services/sendError");
const { auth } = require("../middlewares/auth");

// All the routes below this middleware will be protected with token
router.use((req, res, next) => auth(req, res, next));
router.use(acl.authorize);

router.post("/clinic", (req, res) => res.send("Success"));

router.get("/secret", (req, res) => res.send("Success"));

module.exports = router;