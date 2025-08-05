const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/productController");

const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", authenticate, isAdmin, createProduct);
router.put("/:id", authenticate, isAdmin, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProductById);

module.exports = router;
