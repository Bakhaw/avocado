import passport from 'passport';

import FacebookStrategy from './strategies/facebook';
import GithubStrategy from './strategies/github';
import GoogleStrategy from './strategies/google';
import InstagramStrategy from './strategies/instagram';
import LocalStrategy from './strategies/local';
import TwitchStrategy from './strategies/twitch';
import TwitterStrategy from './strategies/twitter';

import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, { _id: user._id })
});

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => done(null, user));
});

passport.use(FacebookStrategy);
passport.use(GithubStrategy);
passport.use(GoogleStrategy);
passport.use(InstagramStrategy);
passport.use(LocalStrategy);
passport.use(TwitchStrategy);
passport.use(TwitterStrategy);

export default passport;