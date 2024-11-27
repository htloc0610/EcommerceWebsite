const express = require("express");
const router = express.Router();

const controller = require("../controllers/account.controller");

// [GET] account/login
router.get("/login", controller.index);

// [GET] account/register
router.get("/register", controller.register);

// [POST] account/register
router.post("/register", controller.createAccount);

// [POST] account/login
router.post("/login", controller.loginAccount);

module.exports = router;
