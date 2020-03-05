const express = require("express");

const app = express();

const mongoose = require("mongoose");
// DB Config
const db = require("./config/database").MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("Mongo Connected successfully"))
.catch(err => console.log(err));

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Routes 
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));