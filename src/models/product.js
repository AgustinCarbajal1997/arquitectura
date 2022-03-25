const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
  },
  brand: {
    type: String,
  },
  genre: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  images: {
    type: Array,
  },
  size: {
    type: Array,
  },
  discount: {
    type: Number,
  },
  highlight: {
    type: Boolean,
  },
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id), delete returnedObject._id;
  },
});

productSchema.plugin(mongoosePaginate);
const Product = new model("product", productSchema);

module.exports = Product;
