import mongoose from "mongoose";

const Schema = mongoose.Schema

const wishlistSchema = new Schema({
  name: String,
  description: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  author: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export { Wishlist }