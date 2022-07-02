const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
require("dotenv").config();
require('./prod')(app)

app.use(express.json());
app.use(cors());
const port = 4000;
const uri = process.env.SIGNUP_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use("/api", register);
app.use("/api", login);
app.use("/api", profile);
app.listen(port, () => console.log("Server up and running"));
