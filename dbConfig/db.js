const mongoose = require('mongoose')
const keys = require("../config/keys");


mongoose.connect(
    keys.mongodb.dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to mongodb");
    }
  );
const db = mongoose.connection

db.on('error', () => console.log('connection error'))
db.once('open', () => console.log('db connected'))

module.exports = db