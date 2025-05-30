import Product from '../models/product.js';

export async function getAllProducts() {
  return await Product.find();
}
