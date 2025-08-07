const express = require("express");
const router = express.Router();
const {
  getSaleByUserId,
  createSale,
  updateSaleStatus,
} = require("../controllers/saleController");
const {
  getSaleDetailBySaleId,
  createSaleDetail,
} = require("../controllers/saleDetailController");

const authenticate = require("../middleware/authenticate");

router.get("/:id_user", getSaleByUserId);
router.get("/:id_sale", getSaleDetailBySaleId);

router.post("/", authenticate, createSale);
router.post("/item/:id_user", authenticate, createSaleDetail);

router.put("/:id", authenticate, updateSaleStatus);

module.exports = router;
