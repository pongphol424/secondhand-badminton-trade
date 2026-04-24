import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      name: 'My Name is BB1',
      user: 'bb1',
      password: 'b332'
    })
  }
}

