const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/payment.controller");

// [GET] /payment
router.get("/", controller.index);

module.exports = router;
