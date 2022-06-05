const MongoClient = require('mongodb').MongoClient;
const Client = new MongoClient('mongodb://localhost:27017');
const db = Client.db('SMF_Management');

const Admin = db.collection('Admin');
const Product = db.collection('Product');
const Progress = db.collection('Progress');
const Target = db.collection('Target');
const Total = db.collection('Total');

Client.connect((err, db) => {
  console.log('Connected to Database');
});

exports.insertAdmin = async (ctx) => {
  const { key, id, pw } = ctx.request.body;
  await Admin.insertOne({ key, id, pw });
  ctx.body = 'insertAdmin Success';
};

exports.insertProduct = async (ctx) => {
  await Product.insertOne(ctx);
  const { name, defect } = ctx.request.body;
  upProdVolume(name);
  if (defect === '1') upDefectVolume(name);
};

exports.insertProgress = async (ctx) => {
  await Progress.insertOne(ctx);
};

exports.insertTarget = async (ctx) => {
  await Target.insertOne(ctx);
};

exports.insertTotal = async (ctx) => {
  await Total.insertOne(ctx);
};

const upProdVolume = (name) => {
  const name_filter = { name: name };
  const up_prod = { $inc: { prod_vol: 1 } };

  if (input) {
    Progress.updateOne(name_filter, up_prod);
    Target.updateOne(name_filter, up_prod);
    Total.updateOne(name_filter, up_prod);
  }
};

const upDefectVolume = (name) => {
  const name_filter = { name: name };
  const up_defect = { $inc: { defect_cnt: 1 } };

  if (defect) {
    Progress.updateOne(name_filter, up_defect);
    Total.updateOne(name_filter, up_defect);
  }
};

const getNow = (tot_name, tot_tar_vol, tot_prod_vol) => {
  const name_filter = { name: tot_name };
  let now = (tot_prod_vol / tot_tar_vol) * 100;
  now = now.toFixed(2);
  Total.updateOne(name_filter, { $set: { now: now } });

  return now;
};

const getDefectRate = (tot_name, tot_defect_cnt, tot_prod_vol) => {
  const name_filter = { name: tot_name };
  let defect_rate = (tot_defect_cnt / tot_prod_vol) * 100;
  defect_rate = defect_rate.toFixed(2);
  Total.updateOne(name_filter, { $set: { defect_rate: defect_rate } });

  return defect_rate;
};

// const changeToInt = (doc) => {
//   for (i = 0; i < doc.length; i++) {
//     doc[i] = parseInt(doc[i]);
//   }
//
//   return doc;
// };
//
// const changeToFloat = (doc) => {
//   for (i = 0; i < doc.length; i++) {
//     doc[i] = parseFloat(doc[i]);
//   }
//
//   return doc;
// };
