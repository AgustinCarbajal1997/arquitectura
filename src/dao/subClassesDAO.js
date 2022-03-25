const ContainerDAO = require("./containerDAO");
const ProductModel = require("../models/product");
const HighlightModel = require("../models/highlights");
const UserModel = require("../models/user");
const PurchaseModel = require("../models/purchases");

class Product extends ContainerDAO {
  constructor() {
    if (Product.instance) {
      return Product.instance;
    }
    super(ProductModel);
    Product.instance = this;
  }
}

class Highlight extends ContainerDAO {
  constructor() {
    if (Highlight.instance) {
      return Highlight.instance;
    }
    super(HighlightModel);
    Highlight.instance = this;
  }
}

class User extends ContainerDAO {
  constructor() {
    if (User.instance) {
      return User.instance;
    }
    super(UserModel);
    User.instance = this;
  }
}

class Purchase extends ContainerDAO {
  constructor() {
    if (Purchase.instance) {
      return Purchase.instance;
    }
    super(PurchaseModel);
    Purchase.instance = this;
  }
}

const productDao = new Product();
const highlightDao = new Highlight();
const userDao = new User();
const purchaseDao = new Purchase();

module.exports = {
  productDao,
  highlightDao,
  userDao,
  purchaseDao,
};
