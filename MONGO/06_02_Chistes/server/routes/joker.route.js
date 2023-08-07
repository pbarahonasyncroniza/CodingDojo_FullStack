const express = require ("express")


//se importan os controladores

const {getJoker, createJoker,deleteJoker} = require ("../controllers/joker.controller");

module.exports = (app) => {
app.get ("/joker/",getJoker)  // Lista todos los chistes
app.post ("/joker/",createJoker) // Crea Chiste
app.delete ("/joker/:id",deleteJoker) // Eliminar un chiste
}

