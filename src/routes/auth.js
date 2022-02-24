const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controllers");

router
    .post("/signUp", user.signUp)
    .post("/login", user.login);

module.exports = router;
