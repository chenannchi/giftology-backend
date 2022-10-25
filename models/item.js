import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: String,
  category: {
    type: String,
    required: true,
    enum: ['Apparel', 'Arts & Crafts', 'Baby', 'Beauty & Personal Care', 'Electronics', 'Everyday Essentials', 'Home & Kitchen', 'Pets', 'Toys & Games', 'Other']
  },
  desc: String,
  url: String,
  img: String,
  purchased: Boolean,
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export { Item }