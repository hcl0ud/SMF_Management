const MongoClient = require('mongodb').MongoClient;
const Client = new MongoClient('mongodb://localhost:27017');
const db = Client.db('SMF_Management');
const db2 = Client.db('SMT_IT');

// 스마트팩토리 관리자 페이지
const Admin = db.collection('Admin');
const Product = db.collection('Product');
const Progress = db.collection('Progress');
const Target = db.collection('Target');
const Total = db.collection('Total');

// 스마트팩토리 유저 페이지
const User = db.collection('User');

// 스마트축사
const User2 = db2.collection('User2');
const Weight = db2.collection('Weight');

let tot_name, tot_tar_vol, tot_prod_vol, tot_defect_cnt;

Client.connect((err, db) => {
  console.log('Connected to Database');
});

exports.loginAdmin = async (ctx) => {
  const { id, pw } = ctx.request.body;

  if (!(await Admin.findOne({ id: id, pw: pw })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else ctx.body = { loginSuccess: true, message: '로그인 성공' };
};

exports.loginUser = async (ctx) => {
  let { userEmail, userPasswd } = ctx.request.body;

  if (!(await User.find({ userEmail, userPasswd })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else {
    let { userName, userPhone, userAddress, userType } = await User.find({
      userEmail,
      userPasswd,
    });
    ctx.body = { userName, userEmail, userPhone, userAddress, userType };
  }
};

exports.loginUser2 = async (ctx) => {
  const { id, pw } = ctx.request.body;

  if (!(await User2.findOne({ id: id, pw: pw })))
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

exports.registerUser = async (ctx) => {
  const { userName, userEmail, userPhone, userAddress, userPasswd, userType } = ctx.request.body;

  if (await User.findOne({ userEmail }))
    ctx.body = { registerSuccess: false, message: '회원가입 실패' };
  else {
    await User.insertOne({ userName, userEmail, userPhone, userAddress, userPasswd, userType });
    ctx.body = { registerSuccess: true, message: '회원가입 성공' };
  }
};

exports.registerUser2 = async (ctx) => {
  const { id, pw } = ctx.request.body;

  if (await User2.findOne({ id })) ctx.body = { registerSuccess: false, message: '회원가입 실패' };
  else {
    await User2.insertOne({ id, pw });
    ctx.body = { registerSuccess: true, message: '회원가입 성공' };
  }
};

exports.insertProduct = async (msg) => {
  await Product.insertOne(msg);
  const { name, is_defect } = msg;
  await upProdVolume(name);
  if (is_defect === '1') await upDefectVolume(name);

  const { worker, state, prod_vol, defect_cnt } = Progress.find({ name }).toArray();
  const { tar_vol } = Target.find({ name }).toArray();

  const { now } = getNow(tot_name, tot_tar_vol, tot_prod_vol);
  const { defect_rate } = getDefectRate(tot_name, tot_defect_cnt, tot_prod_vol);

  const total = { name, worker, state, tar_vol, prod_vol, defect_cnt, now, defect_rate };

  await Total.insertOne(total);
  console.log('insert success');
};

exports.insertProgress = async (ctx) => {
  await Progress.insertOne(ctx);
  console.log('insert success');
};

exports.insertTarget = async (ctx) => {
  await Target.insertOne(ctx);
  console.log('insert success');
};

exports.insertWeight = async (ctx) => {
  await Weight.insertOne(ctx);
  console.log('insert success');
};

const upProdVolume = async (name) => {
  await Progress.updateOne({ name: name }, { $inc: { prod_vol: 1 } });
  await Target.updateOne({ name: name }, { $inc: { prod_vol: 1 } });
  await Total.updateOne({ name: name }, { $inc: { prod_vol: 1 } });
};

const upDefectVolume = async (name) => {
  const name_filter = { name: name };
  const up_defect = { $inc: { defect_cnt: 1 } };

  await Progress.updateOne(name_filter, up_defect);
  await Total.updateOne(name_filter, up_defect);
};

const getNow = async (tot_name, tot_tar_vol, tot_prod_vol) => {
  const name_filter = { name: tot_name };
  let now = (tot_prod_vol / tot_tar_vol) * 100;
  now = now.toFixed(2);
  await Total.updateOne(name_filter, { $set: { now: now } });

  return now;
};

const getDefectRate = async (tot_name, tot_defect_cnt, tot_prod_vol) => {
  const name_filter = { name: tot_name };
  let defect_rate = (tot_defect_cnt / tot_prod_vol) * 100;
  defect_rate = defect_rate.toFixed(2);
  await Total.updateOne(name_filter, { $set: { defect_rate: defect_rate } });

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
