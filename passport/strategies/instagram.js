import Strategy from 'passport-instagram';
import User from '../../models/User';
import keys from '../keys';

const { callbackURL, clientID, clientSecret } = keys.instagram;

const InstagramStrategy = new Strategy({
    clientID,
    clientSecret,
    callbackURL
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ instagramId: profile.id }).then(currentUser => {
        if (currentUser) done(null, currentUser);
        else {
            new User({
                displayName: profile.displayName,
                // ? replace -> Remove le "_normal" à la fin pour récupérer la taille originale de l'image
                image: profile._json.data.profile_picture,
                // TODO request for Email response from instagram api
                // email: profile.emails[0].value,
                instagramId: profile.id
            }).save().then(newUser => done(null, newUser));
        }
    });
})

export default InstagramStrategy;