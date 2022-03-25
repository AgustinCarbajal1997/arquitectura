const express = require("express");
const router = express.Router();
const products = require("../controllers/product.controllers");
const auth = require("../controllers/auth.controllers");
const {
  validateGetById,
  validateGeneralSearch,
  validateGetSeveralIds,
  validateGetByCategory,
  validateSetFavorites,
} = require("../validators/products");
router
  .get("/all", products.getAll)
  .get("/getById/:id", validateGetById, products.getById)
  .get("/generalSearch", validateGeneralSearch, products.generalSearch)
  .get("/getSeveralIds", validateGetSeveralIds, products.getSeveralIds)
  .get(
    "/getByCategory/:category",
    validateGetByCategory,
    products.getByCategory
  )
  .get("/getHighlights", products.getHighlights)
  .get("/getProductHighlighted", products.getProductHighlighted)
  .post(
    "/setFavorites",
    validateSetFavorites,
    auth.authVerification,
    products.setFavorites
  );

module.exports = router;
