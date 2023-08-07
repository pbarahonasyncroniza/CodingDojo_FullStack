const express = require('express');
const app = express();
require('./server/routes/person.routes')(app); // This is new
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
