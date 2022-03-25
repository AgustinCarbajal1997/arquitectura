const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controllers");
const auth = require("../controllers/auth.controllers");
const paymentController = require("../controllers/payment.controllers");
const {
  validatePostProductCart,
  validateDeleteProductCart,
  validateGetPurchase,
  validateConfirmPurchase
} = require("../validators/cart");
router
  .post(
    "/postProductCart",
    validatePostProductCart,
    auth.authVerification,
    cart.postProductCart
  )
  .post(
    "/deleteProductCart",
    validateDeleteProductCart,
    auth.authVerification,
    cart.deleteProductCart
  )
  .get(
    "/getPurchases",
    validateGetPurchase,
    auth.authVerification,
    cart.getPurchases
  )
  .post(
    "/confirmPurchase",
    validateConfirmPurchase,
    auth.authVerification,
    cart.confirmPurchase,
    paymentController
  );

module.exports = router;
