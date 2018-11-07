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
        err ? console.log(err) : res.json(allRecettes)
    });
});

router.get('/limit/:limit', (req, res) => {
    const query = Recette.find({}).limit(Number(req.params.limit));
    query.exec((err, recettes) => err ? console.log(err) : res.json(recettes))
})

router.get('/id/:id', (req, res) => {
    console.log(req.params.id)
    Recette.findById(req.params.id, (err, recette) => {
        err ? console.log(err) : res.json(recette)
    });
});

router.post('/add', upload.single('recetteInfos.recetteImage'), (req, res) => {
    const newRecette = new Recette(req.body);
    
    newRecette.recetteInfos.recetteImage = req.file.filename;

    newRecette.save((err, recette) => {
        err ? res.send(err) : res.json(`${recette.title} added with success!`);
    })
});

// ? Like une recette
router.post('/like/:recetteId/:userId', (req, res) => {
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

// ? Autorise l'user à supprimer seulement SES recettes à lui
router.get('/delete/:authorId/:recetteId', (req, res) => {
    Recette.findById(req.params.recetteId, (err, recette) => {
        if (err) return console.log(err);
        if (recette.authorId === req.params.authorId) {
            Recette.findByIdAndRemove(req.params.recetteId, (err, recette) => {
                err ? res.send(err) : res.json(`${recette.title} deleted with success!`);
            });
        } else {
            res.json({ message: "Vous n'avez pas les droits" })
        }
    });
});

// TODO Renvoie les recettes crées par l'user
router.get('/createdBy/:authorId', (req, res) => {
    const query = { 'authorInfos.id': req.params.authorId };
    Recette.find(query, (err, recettes) => {
        err ? console.log(err) : res.json(recettes)
    });
})

router.post('/update/:id', (req, res) => {
    Recette.findByIdAndUpdate(req.params.id, req.body, (err, recette) => {
        err ? res.send(err) : res.json(`${recette.title} updated with success!`);
    })
})

export default router;