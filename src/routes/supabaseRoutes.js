const express = require("express");
const router = express.Router();
const supabase = require("../configs/supabase");
router.get("/credentials", (req, res) => {
  res.json({ supabase });
});
