import { Router } from 'express'
import * as friendsCtrl from '../controllers/friends.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/

router.use(decodeUserFromToken)
router.get('/', checkAuth, friendsCtrl.index)
router.put('/:id', checkAuth, friendsCtrl.addFriend)

export { router }