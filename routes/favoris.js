import { Router } from 'express';
import Recette from '../models/Recette';
import User from '../models/User';

const router = Router();

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) return console.log(err);
        Recette.find({ _id: { $in: user.favoritesId } }, (err, favoris) => {
            if (err) return console.log(err);
            return res.json(favoris);
        })
    })
});

router.post('/add/:recetteId/:userId', (req, res) => {
    const { recetteId, userId } = req.params;

    User.findById(userId, (err, user) => {
        if (err) return console.log(err);
        if (user.favoritesId.indexOf(recetteId) !== -1) {
            user.favoritesId.pull(recetteId);
            user.save();
        } else {
            user.favoritesId.push(recetteId);
            user.save();
        }
        return res.json(user);
    })
});

export default router;