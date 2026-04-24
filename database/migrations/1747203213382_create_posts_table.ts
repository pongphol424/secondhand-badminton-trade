import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('title',150).notNullable()
      table.string('body',255).notNullable()
      table.integer('price').notNullable().unsigned()
      table.string('brand',30).notNullable()
      table.string('model',70).notNullable()
      table.string('weight',20).nullable()
      table.string('balance',20).nullable()
      table.string('flex',20).nullable()
      table.string('grip',20).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}