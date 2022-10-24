import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Wishlist'}],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend'}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
