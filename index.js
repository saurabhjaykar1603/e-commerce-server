import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./src/models/product";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("all good ");
});

// database connection
const connectMongoDB = async (req, res) => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("mongoDB connection successful");
  }
};
connectMongoDB();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port 1 ${PORT}`);
});
