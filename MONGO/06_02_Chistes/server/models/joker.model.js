

// importar dependencias 
const mongoose = require ("mongoose");



// crear esquema 
const jokerSchema = new mongoose.Schema({
    joke_name:{type:string}
    
},{

    timestamps:true

})

// crear una funcion constructora  del modelo y almacenar las variales en joker 

const jokerModel = mongoose.model("joker", jokerSchema)

// exportar jokermodel

module.exports = jokerModel