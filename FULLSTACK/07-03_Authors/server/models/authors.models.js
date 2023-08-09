const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "needs Product Title"],
    minlength: [1, "At least 2 characters"],
  },

  last_name: {
    type: String,
    required: [true, "needs price"],
    minlength: [1, "At least 2 characters"],
  },
 
}, {
  timestamps: true,
});

const AuthorModel = mongoose.model("Products", AuthorSchema);

module.exports = AuthorModel;
