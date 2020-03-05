const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => res.send("Welcome"));

router.post("/register", (req, res) => {
    
    const { name, email, password, confirm_password, role } = req.body;

    let errors = [];

    // Check for mandatory fields
    if(!name || !email || !password || !confirm_password || !role){
        errors.push("All the fields are required");
    }

    // Check for passwords match 
    if(password !== confirm_password){
        errors.push("Passwords don't match");
    }

    if(errors.length > 0){
        res.send({ errors: errors });
    }
    else{
        User.findOne({ email: email })
        .then(user => {
            if(user){
                res.send("Email is already registered");
            } else{
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;

                        const newUser = new User({
                            name,
                            email,
                            password: hash,
                            role
                        });
                        res.send(newUser);
                    })
                })
            }
        })
        .catch(err => res.send(err))
    }
});

module.exports = router;