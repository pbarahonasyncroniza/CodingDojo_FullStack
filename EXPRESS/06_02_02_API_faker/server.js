const express = require ("express");

const app = express();
const port = 8000 ;


// 3 Enabling settings for being able to read JSON and parse url encoded data in requests
// ambas expresiones son funciones middleware responsables de proporcionar y analizar  datos de request.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// 4  Importar rutas de la API y pasarlas por la app


// 5 conectar a puerto n
app.listen (port, ()=> console.log (`escuchando puerto: ${port}`));
