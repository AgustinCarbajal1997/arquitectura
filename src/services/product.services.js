const Factory = require("../dao/factory");

const getAll = async (page, limit) => {
  try {
    const data = await Factory.models("product").getAll({ page, limit });
    return data;
  } catch (error) {
    throw error;
  }
};
const getById = async (id) => {
  try {
    const data = await Factory.models("product").getById(id);
    if (!data) throw { status: 404, message: "Product doesn't exist." };
    return data;
  } catch (error) {
    throw error;
  }
};

const generalSearch = async (
  q,
  brand,
  genre,
  type,
  page,
  limit,
  pagination
) => {
  try {
    const regexList = q.map((item) => new RegExp(`${item}`, "i"));
    const query = {
      title: { $all: regexList },
      brand: brand ? new RegExp(`${brand}`, "i") : /^/,
      genre: genre ? new RegExp(`${genre}`, "i") : /^/,
      type: type ? new RegExp(`${type}`, "i") : /^/,
    };
    const data = await Factory.models("product").getByQuery(query, {
      page,
      limit,
      pagination,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getSeveralIds = async (q, page, limit, pagination) => {
  try {
    const query = { _id: { $in: q } };
    const data = await Factory.models("product").getByQuery(query, {
      page,
      limit,
      pagination,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getByCategory = async (
  category,
  brand,
  genre,
  type,
  page,
  limit,
  pagination
) => {
  try {
    const filters = {
      brand: brand ? new RegExp(`${brand}`, "i") : /^/,
      genre: genre ? new RegExp(`${genre}`, "i") : /^/,
      type: type ? new RegExp(`${type}`, "i") : /^/,
    };
    if (category === "ofertas") {
      const query = {
        discount: { $gt: 0 },
        ...filters,
      };
      const data = await Factory.models("product").getByQuery(query, {
        page,
        limit,
        pagination,
      });
      return data;
    }
    const query = {
      category: new RegExp(`${category}`, "i"),
      ...filters,
    };
    const data = await Factory.models("product").getByQuery(query, {
      page,
      limit,
      pagination,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const setFavorites = async (userId, productId) => {
  try {
    const existsId = await Factory.models("product").getById(productId);
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
    const currentFavorites = await Factory.models("user").getById(userId);
    const existsFav = currentFavorites.favorites.find(
      (item) => item === productId
    );
    let update;
    existsFav
      ? (update = await Factory.models("user").updateById(
          userId,
          queryDeleteUpdate
        ))
      : (update = await Factory.models("user").updateById(
          userId,
          queryAddUpdate
        ));
    return update;
  } catch (error) {
    throw error;
  }
};

const getHighlights = async (page, limit, pagination) => {
  try {
    const data = await Factory.models("highlight").getAll({
      page,
      limit,
      pagination,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getProductHighlighted = async (query, page, limit, pagination) => {
  try {
    const data = await Factory.models("product").getByQuery(query, {
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
  getAll,
  getById,
  generalSearch,
  getSeveralIds,
  getByCategory,
  setFavorites,
  getHighlights,
  getProductHighlighted,
};
