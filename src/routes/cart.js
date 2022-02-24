const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controllers");
const auth = require("../controllers/auth.controllers");
router
    .post("/postProductCart", auth.authVerification, cart.postProductCart)
    .post("/deleteProductCart", auth.authVerification, cart.deleteProductCart)
    .get("/getPurchases", auth.authVerification,cart.getPurchases)
    .get("/confirmPurchase", auth.authVerification, cart.confirmPurchase)


module.exports = router;