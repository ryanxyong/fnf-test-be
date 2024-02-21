// *Note* Refactored from code on the public CS52 page: https://brunchlabs.notion.site/Schedule-7457e761c83f4b37bbbdca10e045b1d9?p=b2d5bb7f6ab3421ba2f96ae25c4761e9&pm=s

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';

// loads in .env file if needed
dotenv.config({ silent: true });

// options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = { usernameField: 'email' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.AUTH_SECRET,
};
// NOTE: we are not calling this a bearer token (although it technically is), if you see people use Bearer in front of token on the internet you could either ignore it, use it but then you have to parse it out here as well as prepend it on the frontend.


// username/email + password authentication strategy
// This function was taken from CS52 page
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    let user;
    let isMatch;
  
    try {
        // Find user based on email
        user = await User.findOne({ email });
        // If there is no user with the given email
        if (!user) {
            return done(null, false);
        }
        // now check if password is correct
        isMatch = await user.comparePassword(password);
        // password is not correct, call done and return false
        if (!isMatch) {
            return done(null, false);
        // password is correct, call done and return user
        } else {
            return done(null, user);
        }
    } catch (error) {
        return done(error);
    }
  });

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
        // See if the user ID in the payload exists in our database
        // If it does, call 'done' with that other
        // otherwise, call done without a user object
        let user;
        try {
            user = await User.findById(payload.sub);
        } catch (error) {
            done(error, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin); // for 'jwt'
passport.use(localLogin); // for 'local'

// middleware functions to use in routes
export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });