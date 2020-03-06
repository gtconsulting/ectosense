const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { JWT_SECRET } = require('../config/jwtConfig');

signToken = user => {
    return jwt.sign({
        iss: "Ectosense",
        sub: user._id,
        role: user.role,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 7) // expiry after 7 days 
    }, JWT_SECRET);
}

module.exports = {
    register: async (reqObj) => {
        const { name, email, password, confirm_password, role } = reqObj;

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
            throw {
                status: 400,
                errors: errors
            };
        }
        else{
            let user = await User.findOne({ email: email });

            if(user){
                throw {
                    status: 400,
                    message: "Email is already registered"
                };
            } else{
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                let newUser = await User.create({
                    name,
                    email,
                    password: hash,
                    role
                });
                newUser = JSON.parse(JSON.stringify(newUser));
                const token = signToken(newUser);
                delete newUser.password;
                newUser.token = token;
                return newUser;
            }
        }
    },
    login: async (req, res, next) => {
        
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: err
                });
            }
            const token = signToken(user);
            res.send({ token });
        })(req, res);
    }
}