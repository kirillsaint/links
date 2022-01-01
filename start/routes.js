'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/index').render('index')
Route.on('/').render('index')
Route.get('/:id', 'LinkController.index')
Route.post('/api/login','AuthController.postLogin').as('login')
Route.post('/api/register','AuthController.postRegister').as('register')
Route.group(() => {
    Route.on('/dashboard/index').render('dashboard/index')
    Route.get('/dashboard/links', 'DashboardController.getLinks')
    Route.get('/dashboard/links/edit/:id', 'DashboardController.editLink')
    Route.on('/dashboard/links/new').render('dashboard/new')
    Route.post('/api/newLink','DashboardController.newLink').as('newLink')
    Route.post('/api/editLink/:id','DashboardController.editLinkAPI').as('editLink')
    Route.post('/api/logout','AuthController.logout').as('logout')
}).middleware(['auth'])
