// 1)import of 3er-party libraries

const express = require ("express")

// 2) Initializing express (app)
const app = express ();
const port = 8000;

// 3 Enabling settings  for being able to read JSON and parse url encoded data in request
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//4 configuring corse in Exprexx instances (app)



//5 Initializing connection to NoSQL database (MongoDB)using mongoose interfase
require("./server/config/mongoose.config");

//6 Importing API routes  and incorporing them to app instance


// 7 Running instance of Express server in selected port
app.listen (port, () => console.log(`Listening on port ${port}`)) 