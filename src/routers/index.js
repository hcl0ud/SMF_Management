const Router = require('koa-router')
const db = require('./db.controller')

const router = new Router()

router
  .get('/', db.list)
  .post('/Admin', db.insertAdmin)
  .post('/Progress', db.insertProgress)
  .post('/Target', db.insertTarget)
  .post('/Total', db.insertTotal)

  .use(ctx => {
    ctx.response.status = 404
    ctx.body = 'Not Found'
  })

module.exports = router