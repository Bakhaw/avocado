import { Strategy } from 'passport-twitch';
import User from '../../models/User';
import keys from '../keys';

const { clientID, clientSecret, callbackURL, scope } = keys.twitch;

const TwitchStrategy = new Strategy({
    clientID,
    clientSecret,
    callbackURL,
    scope
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ twitchId: profile.id }).then(currentUser => {
        if (currentUser) done(null, currentUser);
        else {
            new User({
                displayName: profile.displayName,
                image: profile._json.logo,
                email: profile.email,
                githubId: profile.id
            }).save().then(newUser => done(null, newUser));
        }
    });
})

export default TwitchStrategy;