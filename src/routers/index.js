const Router = require('koa-router')
const ctrl = require('./api')

const router = new Router()

router
  .get('/', ctrl.list)
  .post('/', ctrl.create)
  .delete('/', ctrl.delete)
  .put('/', ctrl.put)
  .patch('/', ctrl.patch)

  .use(ctx => {
    ctx.response.status = 404
    ctx.body = 'Not Found'
  })

module.exports = router