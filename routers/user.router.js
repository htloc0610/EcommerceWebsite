const express = require("express");
const router = express.Router();

const controller = require("../controllers/account.controller");

// [GET] /
router.get("/", controller.index);

module.exports = router;
