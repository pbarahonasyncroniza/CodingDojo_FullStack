// importing external Libraries
const mongoose = require ("mongoose");

// creating a system Schema for the model (blue Print)

const petSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Pet name is require"],
        minlength : [3, " pet name must have at least 3 characters long"]
    },

    type:{
        type:String,
        require :[true, "Pet type must be at least 3 characters long"]
    },

    owner :{
        type: mongoose.Schema.types.ObjectId,
        ref: "User",
        require:true 
    }
},{
        timestamps: true
    

});

//creating Model Using Shena
const userModel = mongoose.model("pet", petSchema);

// Exporting Model 
module.exports = userModel;