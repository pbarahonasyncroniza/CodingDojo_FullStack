// 1 import Libraries
const express = require ("express");
const cors = require ("cors");

// 2 inicializando  Express
const app = express ();


//JSON Settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Configuracion CORS en Express instacia ("app")
const corsOptions = {
    credentials: true, // Allow credentials (cookies) to be sent to/from origin
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET, POST, PATCH, DELETE', // Allow these methods
    // allowedHeaders: 'Content-Type, Authorization', // Allow these headers
  };
  app.use(cors(corsOptions));

// Iinicializando Mongo
require("./config/mongo.config")

//Importando API routes 
const taskRoutes =require("./routes/task.routes");
const userRoutes =require("./routes/user.routes");

taskRoutes(app);
userRoutes(app);



app.listen(8000, ()=> 
console.log("Escuchando Puerto 8000"))
