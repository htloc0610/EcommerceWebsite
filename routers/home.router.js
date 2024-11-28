const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticated.middlewares");

const homeController = require("../controllers/home.controller");

// [GET] /
router.get("/", authenticate.ensureAuthenticated, homeController.index);

module.exports = router;
