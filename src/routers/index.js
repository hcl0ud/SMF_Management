<<<<<<< HEAD
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
=======
const Router = require('koa-router');
const dbInsert = require('./db.insert.controller');
const dbFind = require('./db.find.controller');

const router = new Router();

router
  .get('/Admin', dbFind.getAdmin)
  .get('/Product', dbFind.getProduct)

  .post('/Admin', dbInsert.insertAdmin);

module.exports = router;
>>>>>>> 8e20949 (mqtt, db api 연결)
