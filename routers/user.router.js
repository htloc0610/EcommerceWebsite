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

// [GET] account/verify/:token
router.get("/verify", controller.verifyAccount);

// [POST] account/forgot-password/:email
router.post("/forgot-password", controller.forgotPassword);

// [POST] account/reset-password/
router.post("/reset-password", controller.resetPassword);

module.exports = router;
