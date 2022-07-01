const Router = require('@koa/router');
const router = new Router();

const db = require('../database');
const Account = require('../database/Account.controller');
const mqtt = require('../MQTT');

router
  // Management System CRUD
  .post('/Product', db.findProduct)
  .post('/Progress', db.findProgress)
  .post('/Target/Find', db.findTarget)
  .post('/Total', db.findTotal)

  .post('/Target/Update', db.insertTarget)

  // Account CRUD
  .post('/Admin/Login', Account.loginAdmin)
  .post('/Admin/Register', Account.registerAdmin)

  .post('/User/Login', Account.loginUser)
  .post('/User/Register', Account.registerUser)

  .post('/User2/Login', Account.loginUser2)
  .post('/User2/Register', Account.registerUser2);

mqtt.Con(); // MQTT Connect
mqtt.Sub(); // MQTT Subscribe

module.exports = router;
