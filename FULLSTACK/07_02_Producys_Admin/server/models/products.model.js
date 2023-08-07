const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "needs Product Title"],
    minlength: [2, "At least 2 characters"],
  },
  price: {
    type: Number,
    required: [true, "needs price"],
    min: [0, "must be greater than or equal to zero"],
  },
  description: {
    type: String,
    required: [true, "needs description"],
    minlength: [2, "At least 2 characters"],
  },
}, {
  timestamps: true,
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
