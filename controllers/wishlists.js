import { Profile } from "../models/profile.js"
import { Wishlist } from "../models/wishlist.js"

const create = async (req, res) => {
  try {
    const wishlist = await Wishlist.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { wishlists: wishlist }},
      { new: true }
    )
    res.status(201).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const wishlists = await Profile.findById(req.user.profile)
      .populate('wishlists')
      res.status(200).json(wishlists)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}


export {
  create,
  index,

}