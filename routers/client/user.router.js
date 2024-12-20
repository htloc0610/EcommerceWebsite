const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../../controllers/client/account.controller");

// [GET] account/login
router.get("/login", controller.index);

// [GET] account/register
router.get("/register", controller.register);

// [POST] account/register
router.post("/register", controller.createAccount);

// [POST] account/login
router.post(
  "/login",
  passport.authenticate("user-login", {
    successRedirect: "/",
    failureRedirect: "/account/login",
  })
);

// [GET] account/verify/:token
router.get("/verify", controller.verifyAccount);

// [POST] account/forgot-password/:email
router.post("/forgot-password", controller.forgotPassword);

// [POST] account/reset-password/
router.post("/reset-password", controller.resetPassword);

// [GET] account/logout
router.get("/logout", controller.logout);

// [GET] account/auth/google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/account/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
