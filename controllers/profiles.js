import { Profile } from '../models/profile.js'
import { Friend } from '../models/requestFriend.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .populate('friends')
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
    console.log(req.params.id)
    console.log(userA)

    const userB = await Profile.findById(req.body._id)
    console.log(userB)


    const docA = await Friend.findOneAndUpdate(
      { requester: userA, recipient: userB },
      { $set: { status: 'requested' } },
      { upsert: true, new: true }
    )

    const updateUserA = await Profile.findOneAndUpdate(
      { _id: userA },
      { $push: { friends: docA._id } }
    )

    const updateUserB = await Profile.findOneAndUpdate(
      { _id: userB },
      { $push: { friends: docA._id } }
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

    const filter = { recipient: req.params.id, requester: req.body._id }
    const update = { status: 'accepted' }

    const updateStatus = await Friend.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    })

    res.status(200).json(updateStatus)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteFriend = async (req, res) => {
  try {
    const userA = await Profile.findById(
      req.params.id)

    const userB = await Profile.findById(
      req.body._id)

      const filter = { recipient: req.params.id, requester: req.body._id }
      const deletedFriendDoc = await Friend.findOneAndDelete(filter)

      const updatedUserA = await Profile.findOneAndUpdate({ _id: userA }, { $pull: { friends: deletedFriendDoc._id }} )

      const updatedUserB = await Profile.findOneAndUpdate({ _id: userB }, { $pull: { friends: deletedFriendDoc._id }} )

    res.status(200).json(updatedUserA)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
  } catch (error) {
    
  }
}

export { index, addPhoto, friendsIndex, addFriend, acceptFriendRequest, deleteFriend, show }
