require('dotenv').config()

const awsIot = require('aws-iot-device-sdk')
const {insertProduct} = require("./db.controller");
const Option = process.env.mqttOptions
const device = new awsIot.device(Option)

const topic = 'SMF_MNG/test'

exports.mqttCon = () => {
  device.on('connect', () => {
    console.log('Connected to AWS IoT Core')
    device.subscribe(topic)
    console.log(`Subscribe to Topic : ${topic}`)
  })
}
exports.mqttProduct = async () => {
  device.on('message', (topic, payload) => {
    const msg = JSON.parse(payload)
    console.log("topic: ", topic, "\nmessage: ", msg)
    insertProduct(msg)
  })
}
