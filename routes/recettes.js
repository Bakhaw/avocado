import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import Recette from '../models/Recette';

const router = Router();

const storage = multer.diskStorage({
    destination: path.resolve('client/src/assets/images/recette-images'),
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.get('/', (req, res) => {
    Recette.find({}, (err, allRecettes) => {
        return err ? console.log(err) : res.json(allRecettes)
    });
});

router.get('/limit/:limit', (req, res) => {
    const query = Recette.find({}).limit(Number(req.params.limit));
    query.exec((err, recettes) => err ? console.log(err) : res.json(recettes))
})

router.get('/id/:id', (req, res) => {
    Recette.findById(req.params.id, (err, recette) => {
        return err ? console.log(err) : res.json(recette)
    });
});

router.post('/add', upload.single('recetteInfos.recetteImage'), (req, res) => {
    const newRecette = new Recette(req.body);

    newRecette.recetteInfos.recetteImage = req.file.filename;
    newRecette.save((err, recette) => {
        return err ? console.log(err) : res.json(`${recette.recetteInfos.title} added with success!`);
    })
});

// ? Like une recette
router.get('/like/:recetteId/:userId', (req, res) => {
    const { recetteId, userId } = req.params;

    Recette.findById(recetteId, (err, recette) => {
        if (err) return console.log(err);

        const { likedBy } = recette.recetteInfos;

        if (!likedBy.includes(userId)) {
            likedBy.push(userId);
            recette.save();
        } else {
            const itemIndex = likedBy.indexOf(userId);
            likedBy.splice(itemIndex, 1);
            recette.save();
        }
        return res.json(recette);
    });
});

// ? Supprimer une recette
router.get('/delete/:recetteId', (req, res) => {
    Recette.findByIdAndRemove(req.params.recetteId, (err, recette) => {
        return err ? res.send(err) : res.json(`${recette.recetteInfos.title} deleted with success!`);
    });
});

// TODO Renvoie les recettes crées par l'user
router.get('/createdBy/:authorId', (req, res) => {
    const query = { 'authorInfos.id': req.params.authorId };
    Recette.find(query, (err, recettes) => {
        return err ? console.log(err) : res.json(recettes)
    });
})

router.post('/update/:id', upload.single('recetteInfos.recetteImage'), (req, res) => {
    console.log('fired', req.body)
    const newRecipe = req.body;
    if (req.file) {
        newRecipe['recetteInfos.recetteImage'] = req.file.filename;
    }

    Recette.findByIdAndUpdate(req.params.id, newRecipe, (err, recette) => {
        return err ? res.send(err) : res.json(`${recette.recetteInfos.title} updated with success!`);
    })
})

export default router;