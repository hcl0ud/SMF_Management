// mongoose 로 db 연결
const Koa = require('koa')
const mongo = require('koa-mongo')
const mongoose = require('mongoose')

const app = new Koa()
const db = mongoose.connection

app
  .use(mongo())

mongoose.connect('mongodb://localhost:27017/SMF_Management',
  {useNewUrlParser: true})

db
  .on('error', () => {
    console.log('Connection Failed')
  })
  .once('open', () => {
    console.log('Connected!')
  })

// Schema 생성
let student = mongoose.Schema({
  name: 'string',
  address: 'string',
  age: 'number'
})

// 정의된 스키마를 객체로 사용할 수 있도록 model() 함수로 컴파일
let Student = mongoose.model('Schema', student)

// Student 객체를 new 로 생성하여 값을 입력
let newStudent = new Student({
  name: '허정운',
  address: '고양시 덕양구 성사동',
  age: '25'
})

// 데이터 저장
newStudent.save((err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Saved!')
  }
})

// Student 레퍼런스 전체 데이터 가져오기
Student.find((err, students) => {
  console.log('--- Read all ---')
  if (err) {
    console.log(err)
  } else {
    console.log(students)
  }
})

// 특정 아이디 값 가져오기
Student.findOne({_id: 'asd'}, (err, student) => {
  console.log('--- Read One ---')
  if (err) {
    console.log(err)
  } else {
    console.log((student))
  }
})

// 특정 아이디 수정하기
Student.findById({_id: 'asd'}, (error, student) => {
  console.log('--- Update(PUT) ---');
  if (error) {
    console.log(error);
  } else {
    student.name = '--modified--';
    student.save(function (error, modified_student) {
      if (error) {
        console.log(error);
      } else {
        console.log(modified_student);
      }
    });
  }
});

// 삭제
Student.remove({_id: '585b7c4371110029b0f584a2'}, function (error, output) {
  console.log('--- Delete ---');
  if (error) {
    console.log(error);
  }

  /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
      어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
      이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
      */
  console.log('--- deleted ---');
});

module.exports = db