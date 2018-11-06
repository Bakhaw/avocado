import { Router } from 'express';
import User from '../models/User';
import passport from '../passport';

const router = Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
      // if the user is not connected, redirect him
      res.redirect('/');
    } else {
      // if he is connected, jump out of that middleware
      next();
    }
  };

router.get('/profile', (req, res) => {    
    const { user } = req;

    // console.log('Utilisateur:', user);
    
    if (user) {
        return res.json({ user });
    } else {
        return res.json({ user: null })
    }
});

router.post('/signup', (req, res) => {
    const { username, displayName, email, password } = req.body;

    User.findOne({ username }, (err, userMatch) => {
        if (userMatch) {
            return res.json({ error: `Sorry, already a user with the username: ${username}` })
        }
        const newUser = new User({
            username,
            displayName,
            email,
            password
        });
        newUser.save((err, savedUser) => {
            if (err) return res.json(err);
            res.redirect('/');
        })
    })
});

router.post('/login',    
    (req, res, next) => {
        console.log('HEREEEEEE:', req.body);
        next()
    },
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log('/login called()');
        console.log(req.user);
        res.redirect('/')
    }
);

router.post('/logout', (req, res) => {
    if (req.user) {
        req.session.destroy();
        res.clearCookie('connect.sid', {path: '/', domain: 'localhost:8080'});
        return res.json({ message: 'Logged out!' })
    } else {
        return res.json({ message: 'No user to log out ...' })
    }
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => res.redirect('/'));

router.get('/facebook/', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => res.redirect('/#/'));

export default router;