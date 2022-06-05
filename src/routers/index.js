const Router = require('koa-router');
const db = require('./db.controller');

const router = new Router();

router
  .get('/Admin', db.getAdmin)
  .get('/Product', db.getProduct)
  .get('/Progress', db.getProgress)
  .get('/Target', db.getTarget)
  .get('/Total', db.getTotal)

  .post('/Admin', db.insertAdmin);

module.exports = router;
