'use strict'

const Link = use('App/Models/Link')

class LinkController {
  async index({ response, params, view }) {

    const link = await Link.find(params.id)

    if(!link) return response.redirect('/index')

    link.body = link.body

    console.log(link)

    return view.render('link', {
      link: link,
      id: params.id,
    })
  }
}

module.exports = LinkController
