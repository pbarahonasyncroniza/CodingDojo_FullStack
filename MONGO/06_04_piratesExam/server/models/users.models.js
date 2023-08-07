const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "seand Forst Name "],
        minLength: [2, "The name is not valid"]
    },
    last_name: {
        type: String,
        required: [true, "Need picture"],
        minLength: [2, "The name is not valid"]
    },
    email: {
        type: String,
        required: [true, "you shouls send a email"],
        
    },
    password: {
        type: String,
        required: [true, "you shouls send a password"],
        minLength: [6, "The password is not valid"],
        maxLength: [12, "The password max 12 characters"]
    },
   
}, {
    timestamps: true
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;