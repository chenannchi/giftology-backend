import { Router } from 'express'
import * as wishlistsCtrl from '../controllers/wishlists.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, wishlistsCtrl.index)
router.get('/:id/items', checkAuth, wishlistsCtrl.itemIndex)
router.get('/:id', checkAuth, wishlistsCtrl.show)
router.get('/:id/item/:itemId', checkAuth, wishlistsCtrl.itemDetails)
router.post('/', checkAuth, wishlistsCtrl.create)
router.post('/:id/items', checkAuth, wishlistsCtrl.createItem)
router.put('/:id', checkAuth, wishlistsCtrl.update)
router.delete('/:id', checkAuth, wishlistsCtrl.delete)

export { router }