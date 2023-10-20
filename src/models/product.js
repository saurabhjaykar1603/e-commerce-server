import { Schema, model } from "mongoose";
// Schema design

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  productImage: String,
  brand: String,
});

//model
const Product = model("Product", productSchema);
export default Product;
