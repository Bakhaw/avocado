import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/:id', (req, res) => {
    const query = User.findById(req.params.id, { library: 1 });
    query.exec((err, library) => {
        if (err) return console.log(err);
        else return res.json(library);
    })
})

export default router;

