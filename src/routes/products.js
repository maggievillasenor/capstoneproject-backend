const express = require("express");
const ProductController = require("../controllers/product");
const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/:id",ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;