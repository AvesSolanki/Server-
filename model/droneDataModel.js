const mongoose = require("mongoose");

const dronDataSchema = mongoose.Schema({
    droneTemp: {
      type: String,
    },
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    droneName: {
      type: String,
    },
    dronePressure: {
      type: String,
    },
    droneX: {
      type: Number,
    },
    droneY: {
      type: Number,
    },
    droneZ: {
      type: Number,
    },
    droneAltitudes: {
      type: String,
    },
    flyTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    droneLocation: {
      type: String,
    },
    clientId:{
      type:String
    }
  });
  
 module.exports =  new mongoose.model("DroneAllData", dronDataSchema);
  