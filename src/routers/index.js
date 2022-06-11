const Router = require('koa-router');
const db = require('./db.controller');

const router = new Router();

router
  .get('/Product', db.getProduct)
  .get('/Progress', db.getProgress)
  .get('/Target', db.getTarget)
  .get('/Total', db.getTotal)

  .post('/Admin/login', db.loginAdmin)
  .post('/Admin/register', db.registerAdmin);

module.exports = router;
