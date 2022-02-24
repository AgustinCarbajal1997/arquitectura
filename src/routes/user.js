const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controllers");
const auth = require("../controllers/auth.controllers");
router
    .get("/getDataUser", auth.authVerification, user.getDataUser)

module.exports = router;