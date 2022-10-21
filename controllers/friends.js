import { Profile } from '../models/profile.js'
import { Friend } from '../models/friend.js'

const acceptFriendRequest = async (req, res) => {
  try {
    const userA = await Profile.findById(
      req.params.id)

    const userB = await Profile.findById(
      req.body._id)

    const filterA = { requester: req.params.id, recipient: req.body._id }
    const filterB = { recipient: req.params.id, requester: req.body._id }
    const update = { status: 3 }

    const docA = await Friend.findOneAndUpdate(filterA, update, {
      new: true,
      upsert: true
    })

    const docB = await Friend.findOneAndUpdate(filterB, update, {
      new: true,
      upsert: true
    })

    res.status(200).json(req.body)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  acceptFriendRequest
}
