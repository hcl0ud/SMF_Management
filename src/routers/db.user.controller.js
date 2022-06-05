const MongoClient = require('mongodb').MongoClient;
const Client = new MongoClient('mongodb://localhost:27017');
const db = Client.db('SMF_Management');

const Admin = db.collection('Admin');

Client.connect((err, db) => {
  console.log('Connected to Database');
});

exports.insertAdmin = async (ctx) => {
  const { key, id, pw } = ctx.request.body;
  await Admin.insertOne({ key, id, pw });
  ctx.body = 'insertAdmin Success';
};
