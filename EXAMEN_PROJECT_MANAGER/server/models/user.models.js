const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  first_name: {
    type: String,
    required: [true, "Requiere name"],
    minlength: [2, "At least 2 characters"],
  },

  last_name: {
    type: String,
    required: [true, "Requiere Last Name"],
    minlength: [2, "At least 2 characters"],
  },
 
  email: {
    type: String,
    required: [true, "Requiere email"],
    minlength: [8, "At least 8 characters"],
  },

  password: {
    type: String,
    required: [true, "Require Password"],
    minlength: [8, "At least 2 characters"],
  },




}, {
  timestamps: true,
});

const UserModel = mongoose.model("Products", UserSchema);

module.exports = UserModel;
