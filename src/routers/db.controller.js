const MongoClient = require('mongodb').MongoClient
const Client = new MongoClient('mongodb://localhost:27017')
const db = Client.db('SMF_Management')

const Admin = db.collection('Admin')
const Product = db.collection('Product')
const Progress = db.collection('Progress')
const Target = db.collection('Target')
const Total = db.collection('Total')

Client.connect((err, db) => {
  console.log('Connected to Database')
})

exports.list = async (ctx) => {
  ctx.body = 'list'
}

exports.insertAdmin = async (ctx) => {
  const {key, id, pw} = ctx.request.body
  await Admin.insertOne({
    key: key,
    id: id,
    pw: pw
  })
  ctx.body = 'insertAdmin Success'
}

exports.insertProduct = async (ctx) => {
  await Product.insertOne(ctx)
  ctx.body = 'insertProduct Success'
//   {
//   "name": "name",
//   "num": "num",
//   "item": "item",
//   "is_defect": "is_defect",
//   "prod_date": "prod_date"
// }
}

exports.insertProgress = async (ctx) => {
  const {name, state, defect_cnt, prod_vol, worker} = ctx.request.body
  await Progress.insertOne({
    name: name,
    state: state,
    defect_cnt: defect_cnt,
    prod_vol: prod_vol,
    worker: worker
  })
  ctx.body = 'insertProgress Success'
}

exports.insertTarget = async (ctx) => {
  const {name, tar_vol, prod_vol} = ctx.request.body
  await Target.insertOne({
    name: name,
    tar_vol: tar_vol,
    prod_vol: prod_vol
  })
  ctx.body = 'insertTarget Success'
}

exports.insertTotal = async (ctx) => {
  const {name, worker, state, tar_vol, prod_vol, defect_cnt, now, defect_rate} = ctx.request.body
  await Total.insertOne({
    name: name,
    worker: worker,
    state: state,
    tar_vol: tar_vol,
    prod_vol: prod_vol,
    defect_cnt: defect_cnt,
    now: now,
    defect_rate: defect_rate,
  })
  ctx.body = 'insertTotal Success'
}
