import Product from '../models/product.js';

export async function getAllProducts() {
  const allProducts = await Product.find();
  return allProducts;
}

export async function getProduct(prodId) {
  try {
    const product = await Product.findOne({ prodId: prodId });
    return product;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
