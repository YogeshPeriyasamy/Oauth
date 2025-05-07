const express = require("express");
const router = express.Router();
const {googleLogin, googleCallback,facebookLogin,facebookCallback} = require("../controllers/authController");

//route for google Oauth
router.get("/auth/google", googleLogin);
router.get("/auth/google/callback", googleCallback);

//route for facebook Oauth
router.get("/auth/facebook", facebookLogin);
router.get("/auth/facebook/callback", facebookCallback);

module.exports = router;