import { Router } from 'express';
import User from '../models/User';

const router = Router();

// ? Find ALL users
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) console.log(err);
    return res.json(users);
  })
})


// ? Find a User by it's ID
router.get('/id/:userId', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    return err ? console.log(err) : res.send(user);
  })
});

export default router;