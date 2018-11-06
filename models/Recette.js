import mongoose from 'mongoose';

const Schema = mongoose.Schema

const RecetteSchema = new Schema({
    authorInfos: {
        displayName: { type: String, required: false },
        email:       { type: String, required: false },
        id:          { type: String, required: false },
        authorImage: { type: String, required: false },
    },
    recetteInfos: {
        title:        { type: String, required: false },
        date:         { type: String, required: false },
        description:  { type: String, required: false },
        instructions: { type: String, required: false },
        ingredients:  { type: Array, required:  false },
        recetteImage: { type: String, required: false },
        time:         { type: Number, required: false }, // Temps en minute
        likedBy:      { type: Array,  required: false }
    }
}, { versionKey: false })

export default mongoose.model('Recette', RecetteSchema, 'recettes');