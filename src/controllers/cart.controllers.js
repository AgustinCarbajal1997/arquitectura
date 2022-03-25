const { errorHandle } = require("../controllers/error.controllers");
const cart = require("../services/cart.services");
const postProductCart = async (req, res) => {
  const { id: userId } = req.user;
  const { productId, size, quantity } = req.body;
  try {
    const data = await cart.postProductCart(userId, {
      productId,
      size,
      quantity,
    });
    res.status(201).json({ dataUser: data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const deleteProductCart = async (req, res) => {
  const { id: userId } = req.user;
  const { productId, size } = req.body;
  try {
    const data = await cart.deleteProductCart(userId, productId, size);
    res.status(201).json({ dataUser: data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const confirmPurchase = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const data = await cart.confirmPurchase(userId, req.body);
    req.updateUser = data.newData;
    req.cartArr = data.cartArr;
    next()
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getPurchases = async (req, res) => {
  let { q, page, limit, pagination } = req.query;

  try {
    const data = await cart.getPurchases(
      q,
      page || 1,
      limit || 12,
      pagination || false
    );
    return res.status(200).json({ data });
  } catch (error) {
    errorHandle(res, error);
  }
};

module.exports = {
  postProductCart,
  deleteProductCart,
  getPurchases,
  confirmPurchase,
};
