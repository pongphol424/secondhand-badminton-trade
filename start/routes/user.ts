import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.get('/register',({view})=>{return view.render('register')}).as('user.regis')
router.post('/register',[UsersController,'register']).as('user.register')
router.post('/login',[UsersController,'login']).as('user.login')
router.get('/login',({view})=>{return view.render('login')})
router.get('/logout',[UsersController,'logout']).as('user.logout')