
// 1  importar express
const express = require ('express');
//2 importar controladores
const {getPeople, cretePerson, deletePerson} = require ("../controllers/people.controller")
// 3 exportar las rutas 
module.exports = (app) => {

app.get ("/people/",getPeople)  // Lista todas las personas 
app.post ("/people/",cretePerson) // Crea Personas 
app.delete ("/people/:id",deletePerson) // Eliminar Personas 
}



