const express = require("express");
const router = express.Router();
const products = require("../controllers/product.controllers");
const auth = require("../controllers/auth.controllers");

router
  .get("/all", products.getAll)
  .get("/getById/:id", products.getById)
  .get("/generalSearch", products.generalSearch)
  .get("/getSeveralIds", products.getSeveralIds)
  .get("/getByCategory/:category", products.getByCategory)
  .get("/confirmPurchase", auth.authVerification,products.confirmPurchase)
  .post("/setFavorites", auth.authVerification, products.setFavorites)
  .post("/postProductCart", auth.authVerification, products.postProductCart)
  .post("/deleteProductCart",auth.authVerification, products.deleteProductCart)

module.exports = router;
