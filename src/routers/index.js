const Router = require('@koa/router');
const router = new Router();

const db = require('./db.controller');
const mqtt = require('./mqtt.controller');

router
  .post('/Product', db.findProduct)
  .post('/Progress', db.findProgress)
  .post('/Target', db.findTarget)
  .post('/Total', db.findTotal)

  .post('/Admin/Login', db.loginAdmin)
  .post('/Admin/Register', db.registerAdmin)

  .post('/User/Login', db.loginUser)
  .post('/User/Register', db.registerUser)

  .post('/User2/Login', db.loginUser2)
  .post('/User2/Register', db.registerUser2);

mqtt.Con();
mqtt.Sub();

module.exports = router;
