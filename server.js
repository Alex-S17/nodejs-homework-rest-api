const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

const connectionToContactsDb = mongoose.connect(DB_HOST);

connectionToContactsDb
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Cannot connect to database. Error message: ${err.message}`);
    process.exit(1);
  });
