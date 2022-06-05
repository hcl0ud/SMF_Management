require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-body');
const router = require('./routers');
const { mqttCon, mqttSub } = require('./routers/mqtt.controller');

const app = new Koa();
const ip = process.env.DOMAIN;
const port = process.env.PORT;
const corsOptions = process.env.corsOptions;

app
  .use(cors(corsOptions))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`Connected to http://${ip}:${port}`);
  });

mqttCon();
mqttSub();
