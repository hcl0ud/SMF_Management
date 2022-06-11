require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-body');
const router = require('./routers');
const { mqttCon, mqttSub } = require('./routers/mqtt.controller');

const app = new Koa();
const ip = process.env.DOMAIN;
const port = process.env.PORT;

app
  .use(bodyparser())
  .use(router.routes())
  .use(cors)
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`Connected to http://${ip}:${port}`);
  });

mqttCon();
mqttSub();
