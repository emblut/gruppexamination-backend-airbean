import Product from '../models/product.js';

export async function getAllProducts() {
  return await Product.find();
}

export async function getProduct(prodId) {
  try {
    const product = await Product.findOne({ prodId: prodId });
    return product;
  } catch (error) {
    console.log(error.message);
    return null; /* fråga om det inte bör vara next ist */
  }
}
