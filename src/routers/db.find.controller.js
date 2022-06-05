const MongoClient = require('mongodb').MongoClient;
const Client = new MongoClient('mongodb://localhost:27017');
const db = Client.db('SMF_Management');

const Admin = db.collection('Product');
const Product = db.collection('Product');
const Progress = db.collection('Progress');
const Target = db.collection('Target');
const Total = db.collection('Total');

exports.getAdmin = async (ctx) => {
  console.log('Found the all Admin');
  ctx.body = await Admin.find().toArray();
};

exports.getProduct = async (ctx) => {
  console.log('Find the all Product');
  ctx.body = await Product.find().toArray();
};

exports.getProgress = async (ctx) => {
  console.log('Find the all Progress');
  ctx.body = await Progress.find().toArray();
};

exports.getTarget = async (ctx) => {
  console.log('Find the all Target');
  ctx.body = await Target.find().toArray();
};

exports.getTotal = async (ctx) => {
  console.log('Find the all Total');
  ctx.body = await Total.find().toArray();
};
