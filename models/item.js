import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: String,
  type: String,
  desc: String,
  url: String,
  img: String,
  purchased: Boolean,
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export { Item }