const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Require Name"],
    minlength: [2, "At least 2 characters"],
  },

  quote: {
    type: String,
    required: [true, "Requiere Id"],
    minlength: [8, "At least 8 characters"],
  },

  photo: {
    type: String,
    required: [true, "Requiere Photo"],
  },

  treasure: {
    type: Number,
    required: [true, "Requiere Treasure"],
    min: [0, "Treasure shoulb be at least 0"],
  },

  position: {
    type: String,
    required: [true, "Requiere Possition"],
    
  },


peg_leg: {
    type: Boolean,
          },


eye_patch: {
    type: Boolean,
},

hook_hand: {
    type: Boolean,
},



 
}, {
  timestamps: true,
});

const PiratesModel = mongoose.model("Pirates", PirateSchema);

module.exports = PiratesModel;
