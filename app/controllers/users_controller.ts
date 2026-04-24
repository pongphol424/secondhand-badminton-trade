import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    

    async register({request,response}:HttpContext){
        const name = request.input('name')
        const username = request.input('username')
        const password = request.input('password')
        const newuser = new User()
        newuser.name = name
        newuser.userName = username
        newuser.password =password
        await newuser.save()
        return response.redirect().toRoute('market.home')
    }

    async login({auth,request,response}:HttpContext){
        const {username,password} = request.only(['username','password'])
        const user = await User.verifyCredentials(username,password)
        await auth.use('web').login(user)
        return response.redirect().toRoute('market.home')
    }

    async logout({auth,response}:HttpContext){
        await auth.use('web').logout()
        return response.redirect().toRoute('market.home')
    }
}