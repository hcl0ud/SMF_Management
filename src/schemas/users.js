const mongoose = require('mongoose');

/**
 * 이름, 나이, 결혼여부, 자기소개, 생성일
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,     // 자료형
    required: true,   // 필수 여부
    unique: true,     // 고유 값
    default: true,
  },
  age: {
    type: Number,
    required: true,

  },
  married: {
    type: Boolean,
    required: true
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema);