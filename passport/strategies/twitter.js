import Strategy from 'passport-twitter';
import User from '../../models/User';
import keys from '../keys';

const { callbackURL, consumerKey, consumerSecret } = keys.twitter;

const TwitterStrategy = new Strategy({
    consumerKey,
    consumerSecret,
    callbackURL
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ twitterId: profile.id }).then(currentUser => {
        if (currentUser) done(null, currentUser);
        else {
            new User({
                displayName: profile.displayName,
                // ? replace -> Remove le "_normal" à la fin pour récupérer la taille originale de l'image
                image: profile.photos[0].value.replace('_normal', ''),
                // TODO request for Email response from twitter api
                // email: profile.emails[0].value,
                twitterId: profile.id
            }).save().then(newUser => done(null, newUser));
        }
    });
})

export default TwitterStrategy;