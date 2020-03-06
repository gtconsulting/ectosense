const passport = require("passport");

module.exports = {
    auth: (req, res, next) => {passport.authenticate('jwt', { session: false }, (err, user) => {
        req.decoded = {
            role: user.role
        }
        next();
    })(req, res, next)}
}