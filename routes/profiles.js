import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id/friends', checkAuth, profilesCtrl.friendsIndex)
router.post('/:id/friends', checkAuth, profilesCtrl.addFriend)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.patch('/:id/friends', checkAuth, profilesCtrl.acceptFriendRequest)
router.put('/:id/friends', checkAuth, profilesCtrl.declineFriendRequest)

export { router }
