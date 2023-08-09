const express = require ( "express");
const cors = require ("cors");

require("./config/mongo.config")


const app = express ();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


require("./routes/authors.routes")(app);

app.listen(8000, ()=> 
console.log("Escuchando Puerto 8000"))
