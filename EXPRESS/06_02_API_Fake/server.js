// 1 importar express
const express = require ("express");   

// 2 inicializar aplicacion express  y crear una const para el puerto 

const app = express();
const port = 8000;

// 3 inicializar moddlewear.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// 4. importar rutas de la API y se pasa el argumento de (app) de express entonces la app reconoce las rutas
require ("./routes/user.routes") (app);
require ("./routes/company.routes") (app);

// correr la aplicacion express en el puerto que se defina 

app.listen (port, () =>  console.log ( 'estamos bien los 33' ))