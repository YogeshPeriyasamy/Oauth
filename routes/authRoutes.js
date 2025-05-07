const express = require("express");
const router = express.Router();
const {googleLogin, googleCallback,} = require("../controllers/authController");

router.get("/auth/google", googleLogin);
router.get("/auth/google/callback", googleCallback);


module.exports = router;