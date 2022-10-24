import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: String,
  category: String,
  description: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Item'}],
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export { Item }