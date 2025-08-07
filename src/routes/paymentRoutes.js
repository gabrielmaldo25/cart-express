const express = require("express");
const router = express.Router();
const {
  createPayment,
  executePayment,
} = require("../controllers/paypalController");

const authenticate = require("../middleware/authenticate");

router.post("/create", authenticate, createPayment);
router.get("/success/:id_sale", authenticate, executePayment);

module.exports = router;
