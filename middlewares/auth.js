const passport = require("passport");

module.exports = {
    auth: (req, res, next) => {passport.authenticate('jwt', { session: false }, (err, user) => {
        if(!user || err){
            return next(err);
        }
        
        req.decoded = {
            role: user.role
        }
        res.locals = {
            user : user._id, 
            clinic : user.clinic 
        };
        next();
    })(req, res, next)}
}