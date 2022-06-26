require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-body');
const router = require('./routers');

const app = new Koa();
const ip = process.env.DOMAIN;
const port = process.env.PORT;

app
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx) => {
    ctx.response
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Headers', '*');
  })
  .use(cors())
  .listen(port, () => {
    console.log(`Connected to http://${ip}:${port}`);
  });
