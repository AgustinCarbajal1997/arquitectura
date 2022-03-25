const Factory = require("../dao/factory");

const postProductCart = async (userId, dataProduct) => {
  try {
    const existId = await Factory.models("product").getById(
      dataProduct.productId
    );
    if (!existId) throw { status: 404, message: "Product doesn't exist" };
    let dataUser = await Factory.models("user").getById(userId);
    let productToPost = {
      productId: dataProduct.productId,
      image: existId.images[0],
      title: existId.title,
      price: existId.price,
      size: dataProduct.size,
      quantity: dataProduct.quantity,
    };
    let cart = [...dataUser.cart];
    if (cart.length) {
      const findProduct = dataUser.cart.findIndex(
        (item) =>
          item.productId === dataProduct.productId &&
          item.size === dataProduct.size
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
    const newData = await Factory.models("user").updateById(userId, query);
    return newData;
  } catch (error) {
    throw error;
  }
};

const deleteProductCart = async (userId, productId, size) => {
  try {
    const queryDelete = {
      $pull: {
        cart: {
          productId,
          size,
        },
      },
    };
    const data = await Factory.models("user").updateById(userId, queryDelete);
    return data;
  } catch (error) {
    throw error;
  }
};

const confirmPurchase = async (userId, dataBuyer) => {
  const { mail, name, lastname, address, city, cellphone, province, zipCode } =
    dataBuyer;
  try {
    let dataUser = await Factory.models("user").getById(userId);
    const total = dataUser.cart.reduce(
      (ac, item) => ac + item.quantity * item.price,
      0
    );
    const newPurchase = {
      mail,
      name,
      lastname,
      address,
      city,
      cellphone,
      province,
      zipCode,
      products: dataUser.cart,
      total,
    };
    const dataPurchase = await Factory.models("purchase").save(newPurchase);
    const query = {
      $push: {
        purchases: dataPurchase.id,
      },
      $set: {
        cart: [],
      },
    };
    const newData = await Factory.models("user").updateById(userId, query);
    return { newData, cartArr:dataUser.cart };
  } catch (error) {
    throw error;
  }
};

const getPurchases = async (q, page, limit, pagination) => {
  try {
    const query = { _id: { $in: q } };
    const data = await Factory.models("purchase").getByQuery(query, {
      page,
      limit,
      pagination,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postProductCart,
  deleteProductCart,
  confirmPurchase,
  getPurchases,
};
