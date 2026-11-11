import User from '#models/user'
import Post from '#models/post'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PostPolicy extends BasePolicy {
    index():AuthorizerResponse{
        return true
  }

    edit(user:User, post:Post):AuthorizerResponse{
        return user.id === post.userId
  }
  
    delete(user:User, post:Post): AuthorizerResponse{
      return user.id === post.userId
  }

    update(user:User, post:Post){
        return user.id === post.userId
  }

}