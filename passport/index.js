import passport from 'passport';

import FacebookStrategy from './facebookStrategy';
import GoogleStrategy from './googleStrategy';
import InstagramStrategy from './instagramStrategy';
import LocalStrategy from './localStrategy';
import TwitterStrategy from './twitterStrategy';

import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, { _id: user._id })
});

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => done(null, user));
});

passport.use(FacebookStrategy);
passport.use(GoogleStrategy);
passport.use(InstagramStrategy);
passport.use(LocalStrategy);
passport.use(TwitterStrategy);

export default passport;