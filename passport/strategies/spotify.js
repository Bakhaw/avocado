import { Strategy } from 'passport-spotify';
import User from '../../models/User';
import keys from '../keys';

const { clientID, clientSecret, callbackURL } = keys.spotify;

const PassportStrategy = new Strategy({
    clientID,
    clientSecret,
    callbackURL
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ spotifyId: profile.id }).then(currentUser => {
        if (currentUser) done(null, currentUser);
        else {
            new User({
                displayName: profile.displayName,
                // image: profile.photos[0].value,
                email: profile.emails[0].value,
                spotifyId: profile.id
            }).save().then(newUser => done(null, newUser));
        }
    });
})

export default PassportStrategy;