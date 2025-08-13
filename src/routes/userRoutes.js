const express = require("express");
const router = express.Router();
const { getUserBySupabaseId } = require("../controllers/userController");

const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");

router.get("/:id_auth_supabase", authenticate, getUserBySupabaseId);

module.exports = router;
