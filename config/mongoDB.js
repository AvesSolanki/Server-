const mongoose = require("mongoose");



function connectToDB(){
    mongoose
  .connect(
    "mongodb+srv://avmalik8:R6zOSGSj2QkDde2N@cluster0.wsrxbnp.mongodb.net/DroneAllData",
    {}
  )
  .then(() => {
    console.log("The data base is connected");
  })
  .catch((e) => {
    console.log("Somethinbg went wrong while connecting DB",e);
  });
}

module.exports = connectToDB;