const mongoose = require("mongoose");
const test = require("dotenv").config();
console.log(test);

const MONGOURL = process.env.MONGOURL;
const DB_NAME = process.env.DB_NAME;
console.log(MONGOURL);
mongoose
  .connect(MONGOURL, {
    dbName: DB_NAME,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`error connecting to db` + err);
  });
