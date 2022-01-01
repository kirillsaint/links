'use strict'

const User = use('App/Models/User')
const Link = use('App/Models/Link')
const Database = use('Database')
const Helpers = use('Helpers')

class DashboardController {
  async getLinks({ view, auth }) {
    const data = await Database.table('links')
      .where('user_id', '=', auth.user.id)
      .orderBy('created_at', 'desc');
    return view.render('dashboard/links', { data: data });
  }
  async newLink({ auth,request, response, session }) {
    const link = new Link();

    const validationOptions = {
            types: ['jpeg'],
            size: '10mb',
    }
    const imageFile = request.file('cover', validationOptions)
    await imageFile.move(Helpers.publicPath('/covers/'+auth.user.id), {
            name: auth.user.username+'_'+auth.user.id+'_'+request.input('title')+'_'+request.input('date')+'.jpg',
            overwrite: true,
    })
    if (!imageFile.moved()) {
            return imageFile.error()
    }

    link.name = request.input('title')
    link.artists = request.input('artist')
    link.cover = '/covers/'+auth.user.id+'/'+auth.user.username+'_'+auth.user.id+'_'+request.input('title')+'_'+request.input('date')+'.jpg'
    link.apple = request.input('apple')
    link.spotify = request.input('spotify')
    link.vk = request.input('vk')
    link.yandex = request.input('yandex')
    link.youtube = request.input('yt')
    link.user_id = auth.user.id


    await link.save()

    session.flash({ notification: 'You create new link!' })

    return response.redirect('/dashboard/links')
  }
  async editLink({ response, params, view }) {

    const link = await Link.find(params.id)

    if(!link) return response.redirect('/index')

    link.body = link.body

    return view.render('dashboard/edit', {
      link: link,
      id: params.id,
    })
  }
  async editLinkAPI({ response, params, view, request, auth }) {

    const link = await Link.find(params.id)

    if(!link) return response.redirect('/index')

    link.name = request.input('title')
    link.artists = request.input('artist')
    if(!request.input('cover_new')) {
      console.log('okay')
    } else {
      const validationOptions = {
            types: ['jpeg'],
            size: '10mb',
      }
      const imageFile = request.file('cover_new', validationOptions)
      await imageFile.move(Helpers.publicPath('/covers/'+auth.user.id), {
              name: auth.user.username+'_'+auth.user.id+'_'+request.input('title')+'_'+request.input('artist')+'.jpg',
              overwrite: true,
      })
      if (!imageFile.moved()) {
              return imageFile.error()
      }
      link.cover = '/covers/'+auth.user.id+'/'+auth.user.username+'_'+auth.user.id+'_'+request.input('title')+'_'+request.input('artist')+'.jpg'
    }
    
    link.apple = request.input('apple')
    link.spotify = request.input('spotify')
    link.vk = request.input('vk')
    link.yandex = request.input('yandex')
    link.youtube = request.input('yt')


    await link.save()

    return response.redirect('/dashboard/links')
  }
}

module.exports = DashboardController
