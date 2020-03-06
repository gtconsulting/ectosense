const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { JWT_SECRET } = require('./jwtConfig');
const User = require("../models/User");

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
      
    try {
      const user = await User.findOne({ email });

        if(!user){
          return done("Incorrect Username / Password", false);
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
  
        if (!passwordsMatch) {
          return done('Incorrect Username / Password');
        }
        return done(null, user);
    } catch (error) {
      done(error);
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : JWT_SECRET
    }, async (jwtPayload, done) => {
        try{
            const user = await User.findById(jwtPayload.sub);

            if(!user){
                return done(null, false);
            }

            done(null, user);
        }
        catch(err){
            done(err, false);
        }
    }
));