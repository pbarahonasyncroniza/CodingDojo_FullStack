const express = require ("express");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

require("./server/config/mongoose.config")

// const jokerRouter = require ("./server/routes/jokes.route");
// jokerRouter(app);


app.listen( 8000, () =>
  console.log ("escuchando Puerto 8000")
)

