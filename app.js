const express = require("express");

const app = express();

const mongoose = require("mongoose");
// DB Config
const db = require("./config/database").MongoURI;

require('./config/passport');
// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("Mongo Connected successfully"))
.catch(err => console.log(err));

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Routes 
app.use("/", require("./routes/users")); 
app.use("/admin", require("./routes/admin"));
app.use("/assistant", require("./routes/assistants"));
app.use("/doctor", require("./routes/doctors"));
app.use("/patient", require("./routes/patients"));

const acl = require('express-acl');
let configObject = {
    filename: 'acl.json',
    path: 'config'
};

let responseObject = {
    status: 'Access Denied',
    message: 'You are not authorized to access this resource'
};

acl.config(configObject, responseObject);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));