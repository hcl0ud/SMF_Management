const db = require('./index');

const Admin = db.collection('Admin'); // 스마트팩토리 관리자 페이지
const User = db.collection('User'); // 스마트팩토리 유저 페이지
const User2 = db.collection('User2'); // 스마트축사

exports.registerAdmin = async (ctx) => {
  const { key, id, pw } = ctx.request.body;

  if (await Admin.findOne({ key: key, id: id }))
    ctx.body = { registerSuccess: false, message: '회원가입 실패' };
  else {
    await Admin.insertOne({ key: key, id: id, pw: pw });
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

exports.loginAdmin = async (ctx) => {
  const { id, pw } = ctx.request.body;

  if (!(await Admin.findOne({ id: id, pw: pw })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else ctx.body = { loginSuccess: true, message: '로그인 성공' };
};

exports.loginUser = async (ctx) => {
  let { userEmail, userPasswd } = ctx.request.body;

  if (!(await User.findOne({ userEmail, userPasswd })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else {
    let { userName, userPhone, userAddress, userType } = await User.findOne({
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
