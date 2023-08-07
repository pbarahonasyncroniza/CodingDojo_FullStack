// import external Libreries
const mongoose = require("mongoose");
const db_name ='mongotest';

//2 connection settings to Mongo DB using 'mongoose' instance

mongoose
    .connect(`mongodb://0.0.0.0:27017/${db_name}`, {
     useNewUrlParser: true,
     useUnifiedTopology : true,
})

.then (() => console.log(`successfull connected to ${db_name} database`))
.catch((err) => console.log (`Error connecting to ${db_name}`))