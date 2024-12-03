const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/payment.controller");

// [GET] /payment
router.get("/", controller.index);

// [GET] /payment/pay
router.get("/pay", controller.pay);

// [GET] /payment/success
router.get("/success", controller.success);

module.exports = router;
