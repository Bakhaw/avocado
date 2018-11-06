import passport from 'passport';

import FacebookStrategy from './facebookStrategy';
import GoogleStrategy from './googleStrategy';
import LocalStrategy from './localStrategy';

import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, { _id: user._id })
});

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => done(null, user));
});

passport.use(LocalStrategy);
passport.use(GoogleStrategy);
passport.use(FacebookStrategy);

export default passport;