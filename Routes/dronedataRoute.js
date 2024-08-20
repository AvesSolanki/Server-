const express = require("express");
const router = express.Router();


const {createDronData} = require("../controller/droneData");

router.post("/feedData",createDronData);


module.exports = router;