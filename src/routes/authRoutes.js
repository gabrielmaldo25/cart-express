const express = require("express");
const router = express.Router();

const { signIn, signUpNewEmail } = require("../controllers/authController");
router.post("/signUp", signUpNewEmail);
router.post("/signIn", signIn);

module.exports = router;
