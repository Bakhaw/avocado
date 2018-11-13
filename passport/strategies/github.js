import Strategy from 'passport-github2';
import User from '../../models/User';
import keys from '../keys';

const { clientID, clientSecret, callbackURL } = keys.github;

const GithubStrategy = new Strategy({
    clientID,
    clientSecret,
    callbackURL
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.id }).then(currentUser => {
        if (currentUser) done(null, currentUser);
        else {
            new User({
                displayName: profile.displayName,
                image: profile.photos[0].value,
                email: profile.emails[0].value,
                githubId: profile.id
            }).save().then(newUser => done(null, newUser));
        }
    });
})

export default GithubStrategy;