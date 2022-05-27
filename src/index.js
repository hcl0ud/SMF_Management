require('dotenv').config()

const Koa = require('koa')
const cors = require('@koa/cors')
const bodyparser = require('koa-body')
const router = require('./routers')
const connect = require('./schemas')

const app = new Koa()
const port = process.env.PORT
const corsOptions = process.env.corsOptions

connect()

app
  .use(cors(corsOptions))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`Connection : http://localhost:${port}`)
  })

router
  .use('/', router.routes())