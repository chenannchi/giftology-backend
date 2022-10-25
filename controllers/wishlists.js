import { Profile } from "../models/profile.js"
import { Wishlist } from "../models/wishlist.js"
import { Item } from "../models/item.js"

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

const show = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id)
    res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

const deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.wishlists.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

// creating an item that connects with a wishlist
const createItem = async (req, res) => {
  console.log(req.params.id)
  try {
    const item = await Item.create(req.body)
    const wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { $push: { items: item }},
      { new: true }
    )
    res.status(201).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}


export {
  create,
  index,
  show,
  update,
  deleteWishlist as delete,
  createItem,

}