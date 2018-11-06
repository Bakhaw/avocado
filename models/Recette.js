import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema

const RecetteSchema = new Schema({
    authorInfos: {
        authorImage: { type: String, required: false },
        displayName: { type: String, required: false },
        email:       { type: String, required: false },
        id:          { type: String, required: false },
    },
    recetteInfos: {
        date:         { type: String, required: false, default: moment().locale('fr').format('LL') },
        description:  { type: String, required: false },
        ingredients:  { type: Array, required:  false },
        instructions: { type: String, required: false },
        likedBy:      { type: Array,  required: false, default: [] },
        recetteImage: { type: String, required: false },
        time:         { type: Number, required: false }, // Temps en minute
        title:        { type: String, required: false },
    }
}, { versionKey: false })

export default mongoose.model('Recette', RecetteSchema, 'recettes');