import { Wishlist } from "../models/wishlist.js"
import { Profile } from "../models/profile.js"
import { Item } from "../models/item.js"

// create a item to add to database
// const create = async (req, res) => {
//   try {
//     const item = await Item.create(req.body)
//     const profile = await Profile.findById(req.user.profile)
//       .populate('wishlists')
//       const wishlist = profile.wishlists
//     console.log(wishlist)
//     res.status(201).json(item)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(err)
//   }
// }

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
  
}