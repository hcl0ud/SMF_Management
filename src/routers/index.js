const Router = require('@koa/router');
const router = new Router();

const db = require('./db.controller');
const mqtt = require('./mqtt.controller');

router.use((ctx) => {
  ctx.response
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Headers', '*');
});

router
  .get('/Product', db.getProduct)
  .get('/Progress', db.getProgress)
  .get('/Target', db.getTarget)
  .get('/Total', db.getTotal)

  .post('/Admin/Login', db.loginAdmin)
  .post('/Admin/Register', db.registerAdmin)

  .post('/User/Login', db.loginUser)
  .post('/User/Register', db.registerUser)

  .post('/User2/Login', db.loginUser2)
  .post('/User2/Register', db.registerUser2);

mqtt.Con();

module.exports = router;
