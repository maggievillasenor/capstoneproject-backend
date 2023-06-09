const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const ProductRoutes = require("./src/routes/products");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/products", ProductRoutes);

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL);
    } catch (err) {
      console.log("Failed to connect to Mongo", err);
    }
};

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.PORT}`);
    connectDB();
});
  
module.exports = { app, server };