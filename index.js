import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./src/models/product.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("all good ");
});

// post rq
app.post("/products", async (req, res) => {
  const { name, description, price, productImage, brand } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    productImage,
    brand,
  });
  const saveProduct = await newProduct.save();
  res.json({
    success: true,
    data: saveProduct,
    message: " Product saved successfully ",
  });
});

// get rq for read all products

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json({
    success: true,
    data: products,
    message: " Product Fetched successfully ",
  });
});

// get rq for read indiviual products
app.get("/product", async (req, res) => {
  const { name } = req.query;
  const productName = await Product.findOne({ name: name });

  if (productName == null) {
    return res.json({
      success: false,
      message: "Product not found",
    });
  }
  res.json({
    success: true,
    data: productName,
    message: "Product found successfully",
  });
});

// delete Req for delete product

app.delete("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  await Product.deleteOne({ _id: _id });
  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

// put rq for change all documentation
app.put("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, description, price, productImage, brand } = req.body;
  await Product.updateOne(
    { _id: _id },
    {
      $set: { name, description, price, productImage, brand },
    }
  );
  const updateProduct = await Product.findOne({ _id: _id });
  res.json({
    success: true,
    data: updateProduct,
    message: "Product updateProduct successfully ",
  });
});

// patch rq for change specifice field of product
app.patch("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, description, price, productImage, brand } = req.body;
  const product = await Product.findById(_id);

  if (name) {
    product.name = name;
  }
  if (productImage) {
    product.productImage = productImage;
  }

  if (description) {
    product.description = description;
  }
  if (price) {
    product.price = price;
  }
  if (brand) {
    product.brand = brand;
  }
  const updatedProduct = await product.save();
  res.json({
    success: true,
    data: updatedProduct,
    message: "Product updated successfully",
  });
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
  console.log(`listening on port  ${PORT}`);
});
