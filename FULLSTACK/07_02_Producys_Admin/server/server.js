const express = require ( "express");
const cors = require ("cors");

require("./config/mongo.config")


const app = express ();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

require("./routes/product.route")(app);

app.listen(8000, ()=> 
console.log("Escuchando Puerto 8000"))
