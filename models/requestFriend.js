import mongoose from 'mongoose'

const Schema = mongoose.Schema

const friendSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'Profile' },
  recipient: { type: Schema.Types.ObjectId, ref: 'Profile' },
  status: {
    type: String,
    enums: [
      'requested',
      'accepted',
    ]
  }
}, { timestamps: true })

const Friend = mongoose.model('Friend', friendSchema)

export { Friend }
