'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinksSchema extends Schema {
  up () {
    this.create('links', (table) => {
      table.increments()
      table.string('cover').notNullable()
      table.string('name', 255).notNullable()
      table.string('artists', 255).notNullable()
      table.string('apple')
      table.string('spotify')
      table.string('vk')
      table.string('yandex')
      table.string('youtube')
      table.boolean('user_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('links')
  }
}

module.exports = LinksSchema
