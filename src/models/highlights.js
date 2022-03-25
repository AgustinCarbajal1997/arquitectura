const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = mongoose;

const highlightSchema = new Schema({
  banner: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
});

highlightSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id), delete returnedObject._id;
  },
});
highlightSchema.plugin(mongoosePaginate);
const Highlight = new model("highlight", highlightSchema);

module.exports = Highlight;
