import { Profile } from '../models/profile.js'
import { Friend } from '../models/friend.js'

const index = async (req, res) => {
  console.log(req.body)
  try {
    const profile = await Profile.findById(req.params.id)
    const friends = profile.friends
    res.status(200).json(friends)
  } catch (err) {
    res.status(500).json(err)
  }
}

const addFriend = async (req, res) => {
  try {
    const userA = await Profile.findById(
      req.params.id)

    const userB = await Profile.findById(
      req.body._id)

    const docA = await Friend.findOneAndUpdate(
      { requester: userB, recipient: userA },
      { $set: { status: 1 } },
      { upsert: true, new: true }
    )

    const docB = await Friend.findOneAndUpdate(
      { recipient: userB, requester: userA },
      { $set: { status: 2 } },
      { upsert: true, new: true }
    )

    const updateUserA = await Profile.findOneAndUpdate(
      { _id: userA },
      { $push: { friends: docA._id } }
    )

    const updateUserB = await Profile.findOneAndUpdate(
      { _id: userB },
      { $push: { friends: docB._id } }
    )
    res.status(200).json(updateUserB)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
// const addFriend = async (req, res) => {
//   console.log(req.params)
//   console.log(req.body)
//   try {
//     const userA = await Profile.findById(
//       req.params)

//     const userB = await Profile.findById(
//       req.body)

//     const docA = await Friend.findOneAndUpdate(
//       { requester: userB, recipient: userA },
//       { $set: { status: 1 } },
//       { upsert: true, new: true }
//     )

//     const docB = await Friend.findOneAndUpdate(
//       { recipient: userB, requester: userA },
//       { $set: { status: 2 } },
//       { upsert: true, new: true }
//     )

//     const updateUserA = await Profile.findOneAndUpdate(
//         { _id: userA },
//         { $push: { friends: docA._id } }
//       )

//     const updateUserB = await Profile.findOneAndUpdate(
//       { _id: userB },
//       { $push: { friends: docB._id } }
//     )
    
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err)
//   }
// }

export {
  index,
  addFriend
}
