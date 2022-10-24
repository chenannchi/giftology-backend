import mongoose from "mongoose";

const Schema = mongoose.Schema

const wishlistSchema = new Schema({
  name: String,
  type: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  // items: [{ type: Schema.Types.ObjectId, ref: 'Item'}]
}, {
  timestamps: true
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export { Wishlist }