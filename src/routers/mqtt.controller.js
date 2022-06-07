const awsIot = require('aws-iot-device-sdk');
const { insertProduct, insertProgress, insertTarget } = require('./db.controller');
const device = new awsIot.device({
  keyPath: __dirname + '/cert/SMF_MNG.private.pem.key',
  certPath: __dirname + '/cert/SMF_MNG.certificate.pem.crt',
  caPath: __dirname + '/cert/RootCA.pem',
  clientId: 'SMF_MNG_Front',
  host: 'a2hxwq5s1gvqp-ats.iot.ap-northeast-2.amazonaws.com',
});

exports.mqttCon = () => {
  device.on('connect', () => {
    console.log('Connected to AWS IoT Core');
    device.subscribe('SMT_IT/CCIT/SMF_MNG/#');
  });
};

exports.mqttSub = async () => {
  device.on('message', (topic, payload) => {
    const msg = JSON.parse(payload);
    switch (topic) {
      case 'SMT_IT/CCIT/SMF_MNG/Product/#':
        insertProduct(msg);
        break;
      case 'SMT_IT/CCIT/SMF_MNG/Progress/#':
        insertProgress(msg);
        break;
      case 'SMT_IT/CCIT/SMF_MNG/Target/#':
        insertTarget(msg);
        break;
    }
  });
};
