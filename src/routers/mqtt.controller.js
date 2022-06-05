<<<<<<< HEAD
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
=======
const awsIot = require('aws-iot-device-sdk');
const {
  insertProduct,
  insertProgress,
  insertTarget,
  insertTotal,
} = require('./db.insert.controller');
const device = new awsIot.device({
  keyPath: __dirname + '/cert/SMF_MNG.private.pem.key',
  certPath: __dirname + '/cert/SMF_MNG.certificate.pem.crt',
  caPath: __dirname + '/cert/RootCA.pem',
  clientId: 'SMF_MNG',
  host: 'a2hxwq5s1gvqp-ats.iot.ap-northeast-2.amazonaws.com',
});

exports.mqttCon = () => {
  device.on('connect', () => {
    console.log('Connected to AWS IoT Core');
    device.subscribe('SMF_MNG/#');
  });
};

exports.mqttSub = async () => {
  device.on('message', (topic, payload) => {
    const msg = JSON.parse(payload);
    switch (topic) {
      case 'SMF_MNG/Product':
        insertProduct(msg);
        break;
      case 'SMF_MNG/Progress':
        insertProgress(msg);
        break;
      case 'SMF_MNG/Target':
        insertTarget(msg);
        break;
      case 'SMF_MNG/Total':
        insertTotal(msg);
        break;
    }
  });
};
>>>>>>> 8e20949 (mqtt, db api 연결)
