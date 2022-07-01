const MongoClient = require('mongodb').MongoClient;
const Client = new MongoClient('mongodb://localhost:27017');
const db = Client.db('SMT_IT');

// 스마트팩토리
const Product = db.collection('Product');
const Progress = db.collection('Progress');
const Target = db.collection('Target');
const Total = db.collection('Total');

// 스마트축사
const Weight = db.collection('Weight');

Client.connect((err, db) => {
  console.log('Connected to MongoDB');
});

exports.findProduct = async (ctx) => {
  const { name } = ctx.request.body;
  ctx.body = await Product.find({ name: name }).toArray();
};

exports.findProgress = async (ctx) => {
  ctx.body = await Progress.find().toArray();
};

exports.findTarget = async (ctx) => {
  const { name } = ctx.request.body;
  ctx.body = await Target.find({ name: name }).toArray();
};

exports.findTotal = async (ctx) => {
  const { name } = ctx.request.body;
  ctx.body = await Total.find({ name }).toArray();
};

exports.insertProduct = async (msg) => {
  const { name, num, item, is_defect, prod_date } = msg;

  await Product.insertOne({ name, num, item, is_defect, prod_date });
  await Progress.updateOne({ name: name }, { $inc: { prod_vol: 1 } });
  await Target.updateOne({ name: name }, { $inc: { prod_vol: 1 } });
  await Total.updateOne({ name: name }, { $inc: { prod_vol: 1 } });

  if (is_defect === '1') {
    await Progress.updateOne({ name: name }, { $inc: { defect_cnt: 1 } });
    await Total.updateOne({ name: name }, { $inc: { defect_cnt: 1 } });
  }

  const { worker, state, prod_vol, defect_cnt } = await Progress.findOne({ name: name });
  const { tar_vol } = await Target.findOne({ name: name });

  await Total.updateOne(
    { name: name },
    {
      $set: {
        worker: worker,
        state: state,
        tar_vol: tar_vol,
        defect_cnt: defect_cnt,
        now: prod_vol / tar_vol,
        defect_rate: defect_cnt / prod_vol,
      },
    },
  );
};

exports.insertProgress = async (ctx) => {
  await Progress.insertOne(ctx);
  console.log('insert success');
};

exports.insertTarget = async (ctx) => {
  const { name, tar_vol } = ctx.request.body;
  await Target.updateOne({ name: name }, { $set: { tar_vol: tar_vol } });
  ctx.body = { message: `목표량: ${tar_vol}` };
};

exports.insertWeight = async (ctx) => {
  await Weight.insertOne(ctx);
  console.log('insert success');
};

module.exports = db;
