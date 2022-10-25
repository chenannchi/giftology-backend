import { Wishlist } from "../models/wishlist.js"
import { Item } from "../models/item.js"

const create = async (req, res) => {
  try {
    const item = await Item.create(req.body)
    res.status(201).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}


export {
  create
}