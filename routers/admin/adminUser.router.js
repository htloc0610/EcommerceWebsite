const express = require("express");
const router = express.Router();
const passport = require("passport");
const authociation = require("../../middlewares/authorization.middlewares");

const controller = require("../../controllers/admin/adminAccount.controller");

// [GET] admin/account/login
router.get("/login", controller.index);

// [GET] admin/account/register
router.get("/register", controller.register);

// [POST] admin/account/register
router.post("/register", controller.createAccount);

// [POST] admin/account/login with role authorization
router.post(
  "/login",
  passport.authenticate("admin-login", {
    successRedirect: "/",
    failureRedirect: "/admin/account/login",
  }),
  authociation.authorizeRole("admin")
);

// [GET] admin/account/logout
router.get("/logout", controller.logout);

module.exports = router;
