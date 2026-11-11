import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Image from './image.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare body:string

  @column()
  declare price:number

  @column()
  declare brand:string

  @column()
  declare model:string

  @column()
  declare weight? :string 

  @column()
  declare balance?:string

  @column()
  declare flex?:string

  @column()
  declare grip?:string
  
  @hasMany(()=>Image)
  declare images:HasMany<typeof Image>
  

  @belongsTo(()=>User)
  declare user:BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}