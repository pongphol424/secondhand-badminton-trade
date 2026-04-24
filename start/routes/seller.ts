import SellersController from "#controllers/sellers_controller";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";








router.get('/posts',[SellersController,'index']).as('seller.posts').use(middleware.auth())
router.get('/create',[SellersController,'create']).as('seller.create').use(middleware.auth())
router.get('/edit/:id',[SellersController,'edit']).as('seller.edit').use(middleware.auth())
router.get('/delete/:id',[SellersController,'delete']).as('seller.delete').use(middleware.auth())
router.post('/store',[SellersController,'store']).as('seller.store').use(middleware.auth())
router.post('/update/:id',[SellersController,'update']).as('seller.update').use(middleware.auth())