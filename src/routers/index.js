const Router = require('koa-router');
const db = require('./db.controller');

const router = new Router();

router
  .get('/Product', db.getProduct)
  .get('/Progress', db.getProgress)
  .get('/Target', db.getTarget)
  .get('/Total', db.getTotal)

  .get('/Admin/login', db.getAdmin)
  .post('/Admin/register', db.insertAdmin);

module.exports = router;
