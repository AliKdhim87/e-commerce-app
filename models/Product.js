import mongoose from "mongoose";
import shortid from "shortid";
const ProductsSckema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    default: shortid.generate(),
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
});
export default mongoose.models.Product ||
  mongoose.model("Product", ProductsSckema);
