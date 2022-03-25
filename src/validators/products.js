const { buildCheckFunction } = require("express-validator");
const check = buildCheckFunction(["body", "query", "params"]);
const { validateResult } = require("../utils/validateResult");

const validateGetById = [
  check("id", "Bad request. Insert an id.").exists().not().isEmpty().escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateGeneralSearch = [
  check("q", "Bad request. Must be an array.").exists().isArray({ min: 1 }),
  check("limit").escape(),
  check("brand").escape(),
  check("genre").escape(),
  check("type").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateGetSeveralIds = [
  check("q", "Bad request. Must be an array.").exists().isArray({ min: 1 }),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateGetByCategory = [
  check("category", "Bad request. Insert a category.").exists().not().isEmpty(),
  check("brand").escape(),
  check("genre").escape(),
  check("type").escape(),
  check("limit").escape(),
  check("orderBy").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateSetFavorites = [
  check("productId").exists().not().isEmpty().escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
module.exports = {
  validateGetById,
  validateGeneralSearch,
  validateGetSeveralIds,
  validateGetByCategory,
  validateSetFavorites
};
