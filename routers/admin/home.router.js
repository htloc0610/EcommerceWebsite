const express = require("express");
const router = express.Router();
const passport = require("passport");
const authorization = require("../../middlewares/authorization.middlewares");

const controller = require("../../controllers/admin/home.controller");

// Author turn off
// router.use(authorization.authorizeRole("admin"));

// [GET] admin/home
router.get("/home", controller.index);

// [GET] admin/all
router.get("/all", controller.getAllAccounts);

// [GET] admin/detail/:id
router.get("/detail/:id", controller.getAccountByID);

// [DELETE] admin/delete/:id
router.get("/delete/:id", controller.deleteAccountByID);

module.exports = router;
