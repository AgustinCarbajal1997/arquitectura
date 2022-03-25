const product = require("../services/product.services");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const data = await product.getAll(page || 1, limit || 12);
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await product.getById(id);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const generalSearch = async (req, res) => {
  let { q, brand, genre, type, page, limit, pagination } = req.query;
  try {
    const data = await product.generalSearch(
      q,
      brand,
      genre,
      type,
      page || 1,
      limit || 12,
      pagination || false
    );
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getSeveralIds = async (req, res) => {
  let { q, page, limit, pagination } = req.query;
  try {
    const data = await product.getSeveralIds(q, page || 1, limit || 12, pagination || false);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const brand = req.query.brand,
    genre = req.query.genre,
    type = req.query.type,
    limit = req.query.limit,
    page = req.query.page,
    pagination = req.query.pagination || false;
  try {
    const data = await product.getByCategory(
      category,
      brand,
      genre,
      type,
      page || 1,
      limit || 12,
      pagination
    );
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const setFavorites = async (req, res) => {
  const { id: userId } = req.user;
  const { productId } = req.body;
  try {
    const data = await product.setFavorites(userId, productId);
    return res.status(200).json({ dataUser: data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};
const getHighlights = async (req, res) => {
  const { page, limit, pagination } = req.query;
  try {
    const data = await product.getHighlights(
      page || 1,
      limit || 12,
      pagination || false
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};
const getProductHighlighted = async (req, res) => {
  const { page, limit, pagination } = req.query;
  const query = { highlight: true };
  try {
    const data = await product.getProductHighlighted(
      query,
      page || 1,
      limit || 12,
      pagination || false
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

module.exports = {
  getAll,
  getById,
  generalSearch,
  getSeveralIds,
  getByCategory,
  setFavorites,
  getHighlights,
  getProductHighlighted,
};
