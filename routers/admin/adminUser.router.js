const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/adminAccount.controller");

// [GET] admin/account/login
router.get("/login", controller.index);

// [GET] admin/account/register
router.get("/register", controller.register);

// [POST] admin/account/register
router.post("/register", controller.createAccount);

// [POST] admin/account/login
router.post("/login", controller.loginAccount);

// [GET] admin/account/logout
router.get("/logout", controller.logout);

module.exports = router;
