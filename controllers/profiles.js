import { Profile } from '../models/profile.js'
import { Friend } from '../models/friend.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
    .then(profiles => res.json(profiles))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
    .then(profile => {
      cloudinary.uploader.upload(imageFile, { tags: `${req.user.email}` })
        .then(image => {
          profile.photo = image.url
          profile.save()
            .then(profile => {
              res.status(201).json(profile.photo)
            })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    })
}

const friendsIndex = async (req, res) => {
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
  console.log(req.params)
  console.log(req.body)
  try {
    const userA = await Profile.findById(req.params.id)

    const userB = await Profile.findById(req.body._id)


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

const acceptFriendRequest = async (req, res) => {
  console.log(req.params)
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

const declineFriendRequest = async (req, res) => {
  try {
    const userA = await Profile.findById(
      req.params.id)

    const userB = await Profile.findById(
      req.body._id)

    const docA = await Friend.findOneAndRemove(
      { requester: userA, recipient: userB }
    )
    console.log(docA)
    const docB = await Friend.findOneAndRemove(
      { recipient: userA, requester: userB }
    )
    const updateUserA = await Profile.findOneAndUpdate({ _id: userA }, { $pull: { friends: docB._id } })
    const updateUserB = await Profile.findOneAndUpdate({ _id: userB }, { $pull: { friends: docA._id } })

    res.status(200).json(updateUserA)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { index, addPhoto, friendsIndex, addFriend, acceptFriendRequest, declineFriendRequest }
