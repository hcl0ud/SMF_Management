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

exports.loginAdmin = async (ctx) => {
  const { id, pw } = ctx.request.body;

  if (!(await Admin.findOne({ id: id, pw: pw })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else ctx.body = { loginSuccess: true, message: '로그인 성공' };
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

exports.registerAdmin = async (ctx) => {
  const { key, id, pw } = ctx.request.body;

  if (await Admin.findOne({ key, id }))
    ctx.body = { registerSuccess: false, message: '회원가입 실패' };
  else {
    await Admin.insertOne({ key, id, pw });
    ctx.body = { registerSuccess: true, message: '회원가입 성공' };
  }
};

exports.insertProduct = async (ctx) => {
  await Product.insertOne(ctx);
  const { name, is_defect } = ctx.request.body;
  upProdVolume(name);
  if (is_defect === '1') upDefectVolume(name);

  const { worker, state, prod_vol, defect_cnt } = Progress.find({ name }).toArray();
  const { tar_vol } = Target.find({ name }).toArray();

  const { now } = getNow(tot_name, tot_tar_vol, tot_prod_vol);
  const { defect_rate } = getDefectRate(tot_name, tot_defect_cnt, tot_prod_vol);

  const total = { name, worker, state, tar_vol, prod_vol, defect_cnt, now, defect_rate };

  await Total.insertOne(total);
};

exports.insertProgress = async (ctx) => {
  await Progress.insertOne(ctx);
};

exports.insertTarget = async (ctx) => {
  await Target.insertOne(ctx);
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
