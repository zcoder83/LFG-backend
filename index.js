const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
// use express.json() to get data into json format
app.use(express.json());
app.use(cors());
// port
const PORT = process.env.PORT || 5500;

// import routes
const routes = require("./routes/PostRoute");

// connect to mongodb
mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));

app.use(routes);

// Add port and connect to server
app.listen(PORT, () => console.log("Server connected!"));
