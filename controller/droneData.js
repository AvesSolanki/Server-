const DroneAllData = require("../model/droneDataModel");
const { v4: uuidv4 } = require("uuid");

//too : check clientId
exports.createDronData = async (req, res) => {
  try {
    let clientId = req.cookies.clientId;
    console.log("The data is here ", clientId, " ", req.cookies);

    if (!clientId) {
      console.log("Inside new entry ");
      clientId = uuidv4();

      const {
        droneTemp,
        lat,
        lng,
        droneName,
        droneAltitudes,
        flyTime,
        endTime,
        droneLocation,
        dronePressure,
        droneX,
        droneY,
        droneZ,
      } = req.body;

      console.log(
        "dist data is here ",
        droneTemp,
        lat,
        lng,
        droneName,
        droneAltitudes,
        flyTime,
        endTime,
        droneLocation,
        dronePressure,
        droneX,
        droneY,
        droneZ
      );

      if (
        !droneTemp ||
        !lat ||
        !lng ||
        !droneName ||
        !droneAltitudes ||
        !flyTime ||
        !endTime ||
        !droneLocation ||
        !dronePressure ||
        !droneX ||
        !droneY ||
        !droneZ
      ) {
        console.log("Some detials are missing");
        return res.status(401).json({
          success: false,
          msg: " some detials are missing ",
        });
      }

      res.cookie("clientId", clientId, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
      console.log("storing cookies code is here ");
      // res.cookie('clientId', clientId, {
      //   maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      // });
      const saveData = await DroneAllData.create({
        droneTemp: droneTemp,
        lat: lat,
        lng: lng,
        droneName: droneName,
        droneAltitudes: droneAltitudes,
        flyTime: flyTime,
        endTime: endTime,
        droneLocation: droneLocation,
        dronePressure:dronePressure,
        droneX:droneX,
        droneY:droneY,
        droneZ:droneZ,
        clientId,
      });

      res.status(200).json({
        success: true,
        msg: "Data is saved successfully in the database",
        data: saveData,
      });
    } else {
      console.log("Inside else  entry ");

      const clientIp = req.ip;
      const {
        droneTemp,
        droneAltitudes,
        droneLocation,
        lat,
        lng,
        droneName,
        flyTime,
        endTime,
        dronePressure,
        droneX,
        droneY,
        droneZ
      } = req.body;

      if (!droneTemp || !droneAltitudes || !droneLocation || !lat || !lng) {
        console.log("Some detials are missing while updation");
        return res.status(401).json({
          success: false,
          msg: " some detials are missing while updation ",
        });
      }

      const saveData = await DroneAllData.findOneAndUpdate(
        { clientId: clientId }, // Filter object
        {
          $set: {
            droneTemp: droneTemp,
            lat: lat,
            lng: lng,
            droneName: droneName,
            droneAltitudes: droneAltitudes,
            flyTime: flyTime,
            endTime: endTime,
            clientIp: clientIp,
            droneLocation: droneLocation,
            dronePressure:dronePressure,
            droneX:droneX,
            droneY:droneY,
            droneZ:droneZ,
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        msg: " UPdated Data is saved successfully in the database",
        data: saveData,
      });
    }
  } catch (e) {
    console.log("Something went wrong in server", e);
    return res.status(500).json({
      success: false,
      msg: "Intrenal server error",
      error: e,
    });
  }
};
