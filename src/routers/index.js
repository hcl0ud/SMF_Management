const Router = require('koa-router');
const dbInsert = require('./db.insert.controller');
const dbFind = require('./db.find.controller');

const router = new Router();

router
  .get('/Admin', dbFind.getAdmin)
  .get('/Product', dbFind.getProduct)
  .get('/Progress', dbFind.getProgress)
  .get('/Target', dbFind.getTarget)
  .get('/Total', dbFind.getTotal)

  .post('/Admin', dbInsert.insertAdmin);

module.exports = router;
