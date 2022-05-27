const {assertBoolean} = require("@babel/core/lib/config/validation/option-assertions");
const Client = require('mongodb').MongoClient
const db = Client.db("SMF_Management")

Client.connect('mongodb://localhost:27017/users', (error, db) => {
  if(error) {
    console.log(error);
  } else {
    console.log("connected:"+db);
    db.close();
  }
})

let i = 0

const Admin = db.collection('Admin')
const Product = db.collection('Product')
const Progress = db.collection('Progress')
const Target = db.collection('Target')
const Total = db.collection('Total')

// 이건 테이블에 데이터 insert 하는 쿼리문
Admin.insertMany({
    "key": 'admin_key',
    "id": 'admin_id',
    "pw": 'admin_pw',
});
Product.insertMany({
    "name": 설비명,
    "num": 제품의 품번,
    "item": 품목,
    "is_defect": 불량 여부(boolean),
    "prod_date": 생산일자,
});
Progress.insertMany({
    "name": 설비명,
    "state": 설비 가동 상태(boolean),
    "defect_cnt": 불량 제품 수량,
    "prod_vol": 현재 생산량,
    "worker": 설비 담당 작업자 이름,
});
Target.insertMany({
    "name": 설비명,
    "tar_vol": 목표 생산량,
    "prod_vol": 현재 생산량,
});
Total.insertMany({
    "name": 설비명,
    "worker": 설비 담당 작업자명,
    "state": 설비 가동 상태(boolean),
    "tar_vol": 생산 목표량,
    "prod_vol": 현재 생산량,
    "defect_cnt": 불량 제품 수량,
    "now": 달성률(목표량대비 현재 생산량),
    "defect_rate": 불량률(현재 생산량대비 불량 수량),
});

// -----------------------------------------------------

// DB에서 데이터를 꺼내면, 데이터는 object 형태로 꺼내진다. (Boolean 값은 예외적으로 Bool 형식이 그대로 유지된다.)
// 따라서 숫자 값(Int 또는 Float)으로 사용되어야 하는 데이터 값들을 숫자 데이터 형식으로 변환해주는 함수이다.

const changeToInt = (doc) => {
  for (i = 0; i < doc.length; i++) {
    doc[i] = parseInt(doc[i])
  }

  return doc
}

const changeToFloat = (doc) => {
  for (i = 0; i < doc.length; i++) {
    doc[i] = parseFloat(doc[i])
  }

  return doc
}

// ------------------------------------------------------

// Admin 테이블의 모든 데이터 값을 return 해주는 함수이다.
// 데이터 값이 여러 개인 경우를 기준으로 각 변수를 배열로 선언했기 때문에 return 되는 값 또한 배열이다.
// 따라서 값을 어떻게 꺼내 쓸 건지는 생각해 봐야 한다....... 죄송

const getAdmin = (Admin) => {
  const admin = Admin.find({}, { key: 1, id: 1, pw: 1 })
  const key = []
  const id = []
  const pw = []

  const length = Admin.countDocuments()

  while (admin.hasNext()) {
    const allAdmin = admin.next()

    for (i = 0; i < length; i++) {
      key[i] = allAdmin.key
      id[i] = allAdmin.id
      pw[i] = allAdmin.pw
    }
  }

  return { key, id, pw }
}

// --------------------------------------------------------------------------------

// Product 테이블의 모든 데이터 값을 return 해주는 함수이다.
// 이하 내용은 위와 같다.

const getProduct = (Product) => {
  const product = Product.find({}, { name: 1, num: 1, item: 1, is_defect: 1, prod_date: 1 })
  const prod_name = []
  const prod_num = []
  const item = []
  const is_defect = []
  const prod_date = []

  const length = Product.countDocuments()

  while (product.hasNext()) {
    const allProduct = product.next()

    for (i = 0; i < length; i++) {
      prod_name[i] = allProduct.name
      prod_num[i] = allProduct.num
      item[i] = allProduct.item
      is_defect[i] = allProduct.is_defect
      prod_date[i] = allProduct.prod_date
    }
  }

  return { prod_name, prod_num, item, is_defect, prod_date }
}

// -----------------------------------------------------------------------------

// Progress 테이블의 모든 데이터 값을 return 해주는 함수이다.
// 이하 내용은 위와 같다.

const getProgress = (Progress) => {
  const progress = Progress.find({}, { name: 1, state: 1, defect_cnt: 1, prod_vol: 1, worker: 1 })
  let prog_name = []
  let prog_state = []
  let prog_defect_cnt = []
  let prog_prod_vol = []
  let prog_worker = []

  const length = Progress.countDocuments()

  while (progress.hasNext()) {
    const allProgress = progress.next

    for (i = 0; i < length; i++) {
      prog_name = allProgress.name
      prog_state = allProgress.state
      prog_defect_cnt = allProgress.defect_cnt
      prog_prod_vol = allProgress.prod_vol
      prog_worker = allProgress.worker
    }
  }

  // 숫자 값들 형 변환
  prog_defect_cnt = changeToInt(prog_defect_cnt)
  prog_prod_vol = changeToInt(prog_prod_vol)

  return { prog_name, prog_state, prog_defect_cnt, prog_prod_vol, prog_worker }
}

// ----------------------------------------------------------

// Target 테이블의 모든 데이터 값을 return 해주는 함수이다.
// 이하 내용은 위와 같다.

const getTarget = (Target) => {
  const target = Target.find({}, { name: 1, tar_vol: 1, prod_vol: 1 })
  const tar_name = []
  let tar_vol = []
  let tar_prod_vol = []

  const length = Target.countDocuments()

  while (target.hasNext()) {
    const allTarget = target.next

    for (i = 0; i < length; i++) {
      tar_name[i] = allTarget.name
      tar_vol[i] = allTarget.tar_vol
      tar_prod_vol[i] = allTarget.prod_vol
    }
  }

  // 숫자 값들 형 변환
  tar_vol = changeToInt(tar_vol)
  tar_prod_vol = changeToInt(tar_prod_vol)

  return { tar_name, tar_vol, tar_prod_vol }
}
// ----------------------------------------------------------------------

// Total 테이블의 모든 데이터 값을 return 해주는 함수이다.
// 이하 내용은 위와 같다.

const getTotal = (Total) => {
  const total = Total.find({}, { name: 1, worker: 1, state: 1, tar_vol: 1, prod_vol: 1, defect_cnt: 1, now: 1, defect_rate: 1 })
  const tot_name = []
  const tot_worker = []
  const tot_state = []
  let tot_tar_vol = []
  let tot_prod_vol = []
  let tot_defect_cnt = []
  const now = []
  const defect_rate = []

  const length = Total.countDocuments()

  while (total.hasNext()) {
    const allTotal = total.next

    for (i = 0; i < length; i++) {
      tot_name[i] = allTotal.name
      tot_worker[i] = allTotal.worker
      tot_state[i] = allTotal.state
      tot_tar_vol[i] = allTotal.tar_vol
      tot_prod_vol[i] = allTotal.prod_vol
      tot_defect_cnt[i] = allTotal.defect_cnt
    }
  }

  // 숫자 값들 형 변환
  tot_tar_vol = changeToInt(tot_tar_vol)
  tot_prod_vol = changeToInt(tot_prod_vol)
  tot_defect_cnt = changeToInt(tot_defect_cnt)

  return { tot_name, tot_worker, tot_state, tot_tar_vol, tot_prod_vol, tot_defect_cnt }
}

// ----------------------------------------------------------------

// 각 테이블의 현재 생산량 필드의 값을 1씩 증가하는 함수이다.
// 제품 바코드가 스캔되고 제품 정보가 들어올 때마다, 해당 함수가 호출되어 생산량 값이 1씩 증가하는 것으로 생각하고 작성했다.
// Progress, Total 테이블까지 파라미터로 넘길 건지... 고려해 봐야 한다.
// 실제로 서버와 연동해서 로직이 어떻게 돌아가는지 보면 수정할 수 있을 것 같은데
// 아직 잘 모르겠다. ㅠㅠ

const upProdVolume = (prod_name) => {
  const name_filter = { name: prod_name }
  const up_prod = { $inc: { prod_vol: 1 } }

  Progress.updateOne(name_filter, up_prod)
  Target.updateOne(name_filter, up_prod)
  Total.updateOne(name_filter, up_prod)
}

// -------------------------------------------------------

// 제품이 불량일 경우, 불량 제품 수량 필드의 값을 1씩 증가하는 함수이다.
// 고려 내용은 위와 같다.

const upDefectVolume = (Progress, Total, prod_name, is_defect) => {
  const name_filter = { name: prod_name }
  const up_defect = { $inc: { defect_cnt: 1 } }

  if (is_defect) {
    Progress.updateOne(name_filter, up_defect)
    Total.updateOne(name_filter, up_defect)
  }
}

// ----------------------------------------------------------

// 현재 달성률을 구해서 return 하는 함수이다.
// 파라미터로 넘겨주는 값들이 모두 위 getXXX() 함수에서 배열로 return 된 함수인데,
// 정상적으로 달성률이 산출되려면 배열형 변수에서 사전에 필요 값만 꺼내어 파라미터로 전송하는 등의 처리가 필요할 것 같다.
// 왜 적다 보니 모든 함수에 고려 사항이 생기고 있는지 모르겠다...

const getNow = (tot_name, tot_tar_vol, tot_prod_vol) => {
  const name_filter = { name: tot_name }
  let now = tot_prod_vol / tot_tar_vol * 100
  now = now.toFixed(2)

  return now
}

// 달성률 update
Total.updateOne(name_filter, { $set: { now } })

// ------------------------------------------------------------

// 현재 불량률을 구해서 return 하는 함수이다.
// 고려 사항은 위와 같다.

const getDefectRate = (tot_name, tot_defect_cnt, tot_prod_vol) => {
  const name_filter = { name: tot_name }
  let defect_rate = tot_defect_cnt / tot_prod_vol * 100
  defect_rate = defect_rate.toFixed(2)

  return defect_rate
}

// 불량률 update
Total.updateOne(name_filter, { $set: { defect_rate } })
