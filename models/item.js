import mongoose from "mongoose";

const Schema = mongoose.Schema

const purchasedSchema = new Schema({
  bought: {
    type: Boolean,
    default: false, 
  },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' } 
  },
  { 
    timestamps: true
})

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
  purchased: purchasedSchema
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export { Item }