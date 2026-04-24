import MarketsController from '#controllers/markets_controller'
import router from '@adonisjs/core/services/router'




router.get('/',({response})=>{return response.redirect().toRoute('market.home')})
router.get('/home',[MarketsController,'index']).as('market.home')
router.post('/home',[MarketsController,'filter']).as('market.filter')
router.get('/show/:id',[MarketsController,'show']).as('market.show')