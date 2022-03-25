const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controllers");
const { validateSignUp, validateLogin } = require("../validators/users");
router
  .post("/signUp", validateSignUp, user.signUp)
  .post("/login", validateLogin, user.login);

module.exports = router;
