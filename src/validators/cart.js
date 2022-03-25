const { buildCheckFunction } = require("express-validator");
const check = buildCheckFunction(["body", "query", "params"]);
const { validateResult } = require("../utils/validateResult");

const validatePostProductCart = [
  check("productId").exists().not().isEmpty().escape(),
  check("size").exists().not().isEmpty().escape().isString(),
  check("quantity").exists().not().isEmpty().escape().isNumeric(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateDeleteProductCart = [
  check("productId").exists().not().isEmpty().escape(),
  check("size").exists().not().isEmpty().escape().isString(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateConfirmPurchase = [
  check("mail")
    .exists()
    .not()
    .isEmpty()
    .isEmail({ blacklisted_chars: ["<", ">", "&", "'", '"', "/"] })
    .trim()
    .escape(),
  check("name").exists().not().isEmpty().isString().trim().escape(),
  check("lastname").exists().not().isEmpty().isString().trim().escape(),
  check("city").exists().not().isEmpty().isString().trim().escape(),
  check("province").exists().not().isEmpty().isString().trim().escape(),
  check("zipCode").exists().not().isEmpty().isString().trim().escape(),
  check("address").exists().not().isEmpty().isString().trim().escape(),
  check("cellphone")
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateGetPurchase = [
  check("q").exists().not().isEmpty().isArray({ min: 1 }),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

module.exports = {
  validatePostProductCart,
  validateDeleteProductCart,
  validateConfirmPurchase,
  validateGetPurchase,
};
