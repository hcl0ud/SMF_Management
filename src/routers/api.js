const User = require('../schemas/users')

// 사용자 전체 조회
exports.list = async (ctx) => {
  let users = await users.find().exec()
  ctx.body = User
  console.log(ctx.body)
}

// 유저 생성
exports.create = async (ctx) => {
  const {
    name,
    age,
    married
  } = ctx.request.body
  const user = new User({
    name,
    age,
    married
  })
  await user.save()
  ctx.body = user
  console.log('CREATE SUCCESS')
}

exports.delete = (ctx, next) => {
  ctx.body = 'deleted'
}

exports.put = (ctx, next) => {
  ctx.body = 'replaced'
}

exports.patch = (ctx, next) => {
  ctx.body = 'updated'
}
