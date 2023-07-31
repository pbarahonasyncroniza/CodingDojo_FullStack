// 1 importando express

const express =require ('express');
// 2 creando una aplicacion de expores
const app = express ()

// 3 Enabling settings for being able to read JSON and parse url encoded data in requests
// ambas expresiones son funciones middleware responsables de proporcionar y analizar  datos de request.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//4  inicializando la coneccion con Mongo DB   , utilizando la interfase de Mongo
require("./config/mongo")

//con esta forma  se van a registrar todas las rutas a la aplicacion 
let peopleRouter = require ("./routes/people.routes");
peopleRouter(app);


//Escuchando al puerto 8000
app.listen (8000, () => 
    console.log("Estamos Andando"))