'use strict'

const Database = use('Database')

class ApiController {
  async getLinks({ view, auth }) {
    return await Database
      .table('links')
      .where('user_id', '=', auth.user.id)
  }
}

module.exports = ApiController
