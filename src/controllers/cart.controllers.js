const Product = require("../models/product");
const User = require("../models/user.js");
const Purchase = require("../models/purchases");
const { errorHandle } = require("../controllers/error.controllers");
const postProductCart = async (req, res) => {
  const { id: userId } = req.user;
  const { dataProduct } = req.body;
  try {
    const existId = await Product.findById(dataProduct.productId);
    if (!existId) throw { status: 404, message: "Product doesn't exist" };
    let dataUser = await User.findById(userId);
    let productToPost = {
      productId: dataProduct.productId,
      image:existId.images[0],
      title: existId.title,
      price: existId.price,
      size: dataProduct.size,
      quantity: dataProduct.quantity,
    };
    let cart = [...dataUser.cart];
    if (cart.length) {
      const findProduct = dataUser.cart.findIndex(
        (item) => item.productId === dataProduct.productId && item.size === dataProduct.size
      );
      findProduct === -1
        ? (cart = [...cart, productToPost])
        : (cart[findProduct] = productToPost);
    } else {
      cart = [...cart, productToPost];
    }
    const query = {
      $set: {
        cart,
      },
    };
    const newData = await User.findByIdAndUpdate(userId, query, {
      new: true,
    });
    res.status(201).json({ dataUser: newData });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const deleteProductCart = async (req, res) => {
  const { id: userId } = req.user;
  const { productId, size } = req.body.dataProduct;
  try {
    const queryDelete = {
      $pull: {
        cart: {
          productId,
          size
        },
      },
    };
    const data = await User.findByIdAndUpdate(userId, queryDelete, {
      new: true,
    });
    res.status(201).json({ dataUser: data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const confirmPurchase = async (req, res) => {
  const { id: userId } = req.user;
  try {
    let dataUser = await User.findById(userId);
    const total = dataUser.cart.reduce(
      (ac, item) => ac + item.quantity * item.price,
      0
    );
    const newPurchase = new Purchase({
      products: dataUser.cart,
      total,
    });
    const dataPurchase = await newPurchase.save();
    const newData = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          purchases: dataPurchase.id,
        },
        $set: {
          cart: [],
        },
      },
      { new: true }
    );
    res.status(201).json({ dataUser: newData });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getPurchases = async(req,res) => {
  try {
    let { q } = req.query;
    if (!q || !Array.isArray(q) || q.some((x) => x.trim() === ""))
      throw { status: 400, message: "Bad request. Insert an array of ids" };
    const data = await Purchase.find({ _id: { $in: q } });
    return res.status(200).json({ data });
  } catch (error) {
    errorHandle(res, error);
  }
}

module.exports = {
  postProductCart,
  deleteProductCart,
  getPurchases,
  confirmPurchase
};
