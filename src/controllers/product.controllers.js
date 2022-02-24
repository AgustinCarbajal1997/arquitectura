const Product = require("../models/product");
const User = require("../models/user.js");
const Purchase = require("../models/purchases");
const order = require("../utils/orderBy");
const getAll = async (req, res) => {
  try {
    const data = await Product.find({});
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) throw { status: 404, message: "Product doesn't exist." };
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const generalSearch = async (req, res) => {
  try {
    let { q, limit, brand, genre, type } = req.query;
    if (!q || !Array.isArray(q) || q.some((x) => x.trim() === ""))
      throw { status: 400, message: "Bad request. Insert an array of words" };
    const regexList = q.map((item) => new RegExp(`${item}`, "i"));
    const data = await Product.find({
      title: { $all: regexList },
      brand: brand ? new RegExp(`${brand}`, "i") : /^/,
      genre: genre ? new RegExp(`${genre}`, "i") : /^/,
      type: type ? new RegExp(`${type}`, "i") : /^/,
    }).limit(Number(limit) || 0);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getSeveralIds = async (req, res) => {
  try {
    let { q } = req.query;
    if (!q || !Array.isArray(q) || q.some((x) => x.trim() === ""))
      throw { status: 400, message: "Bad request. Insert an array of ids" };
    const data = await Product.find({ _id: { $in: q } });
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category)
      throw {
        status: 400,
        message: "Please insert a param with a product category.",
      };
    const brand = req.query.brand,
      genre = req.query.genre,
      type = req.query.type;
    const { orderBy } = req.query;
    const data = await Product.find({
      category: new RegExp(`${category}`, "i"),
      brand: brand ? new RegExp(`${brand}`, "i") : /^/,
      genre: genre ? new RegExp(`${genre}`, "i") : /^/,
      type: type ? new RegExp(`${type}`, "i") : /^/,
    }).sort(orderBy ? { price: order[orderBy] } : { $natural: 1 });
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const setFavorites = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.body;
    const existsId = await Product.findById(productId);
    if (!existsId) throw { status: 404, message: "Product ID doesn't exist." };
    const queryAddUpdate = {
      $push: {
        favorites: productId,
      },
    };
    const queryDeleteUpdate = {
      $pull: {
        favorites: productId,
      },
    };
    const currentFavorites = await User.findById(userId);
    const existsFav = currentFavorites.favorites.find(
      (item) => item === productId
    );
    let update;
    existsFav
      ? (update = await User.findByIdAndUpdate(userId, queryDeleteUpdate, {
          new: true,
        }))
      : (update = await User.findByIdAndUpdate(userId, queryAddUpdate, {
          new: true,
        }));
    return res.status(200).json({ dataUser: update });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

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
  const { productId } = req.body;
  try {
    const queryDelete = {
      $pull: {
        cart: {
          productId,
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

module.exports = {
  getAll,
  getById,
  generalSearch,
  getSeveralIds,
  getByCategory,
  setFavorites,
  postProductCart,
  deleteProductCart,
  confirmPurchase,
};
