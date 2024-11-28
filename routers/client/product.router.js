const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();
const uploadClound = require("../../middlewares/uploadClound.middlewares");

const productController = require("../../controllers/client/product.controller");

// [GET] /products
// Get all products
router.get("/", productController.index);

// [POST] /products
// Create new product
router.post(
  "/",
  upload.single("image"),
  uploadClound.upload,
  productController.newProduct
);

// [DELETE] /products/:id
// Delete product
router.delete("/:id", productController.deleteProduct);

// [GET] /products/find
// Find product
router.get("/find", productController.findProduct);

// [GET] /products/:id
// Get detail product
router.get("/:id", productController.detailProduct);

// [PATCH] /products/:id
// Update product
router.patch("/:id", productController.updateProduct);

module.exports = router;
