import { Profile } from "../models/profile.js"
import { Wishlist } from "../models/wishlist.js"
import { Item } from "../models/item.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const wishlist = await Wishlist.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { wishlists: wishlist } },
      { new: true }
    )
    wishlist.author = profile

    res.status(201).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const wishlists = await Wishlist.find(req.query)
      .populate('author')

    res.status(200).json(wishlists)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id)

    res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
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
    res.status(500).json(error)
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
    res.status(500).json(error)
  }
}

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body)
    const wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { $push: { items: item } },
      { new: true }
    )

    res.status(201).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const itemIndex = async (req, res) => {
  try {
    const items = await Wishlist.findById(req.params.id)
      .populate('items')

    res.status(200).json(items.items)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const itemDetails = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId)

    res.status(200).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      { new: true }
    )

    res.status(200).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.itemId)
    const wishlist = await Wishlist.findById(req.params.id)
    wishlist.items.remove({ _id: req.params.itemId })
    await wishlist.save()

    res.status(200).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const purchaseUpdate = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId)

    let purchased = item.purchased
    let template = {
      bought: true
    }

    for (let key in purchased) {
      if (key === 'bought') {
        purchased[key] = !purchased[key]
      } else {
        if (purchased.bought) {
          template.owner = req.user.profile
          template.bought = purchased.bought
          purchased = template
        } else {
          template.bought = purchased.bought
          delete template.owner
          purchased = template
        }
      }
    }
    item.purchased = purchased
    item.save()

    res.status(200).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


export {
  create,
  index,
  show,
  update,
  deleteWishlist as delete,
  createItem,
  itemIndex,
  itemDetails,
  updateItem,
  deleteItem,
  purchaseUpdate
}