import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  }
}, { versionKey: false })

export default mongoose.model('Product', ProductSchema, 'products');