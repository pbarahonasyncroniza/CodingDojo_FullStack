const mongoose = require("mongoose");
const db_name = "pirates_db"

mongoose.connect(`mongodb://0.0.0.0:27017/${db_name}`, {
    useNewUrlParser: true, // Avoids deprecation warnings -> enables new MongoDB connection string parser
    useUnifiedTopology: true, // Avoids connection errors -> enables new unified topology engine for MongoDB Node.js driver
}).then(() => {
    console.log("Rocking with mongo:" + db_name);
}).catch(() => {
    console.log("Error connecting Mongo");
});