import { Router } from 'express'
import * as itemsCtrl from '../controllers/items.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, itemsCtrl.create)

export {router}