const express = require("express");
const router = express.Router();
const twilioCtrl = require("../controller/twilio-ctrl");

router.post("/sms", twilioCtrl.sendMessage);

module.exports = router;
