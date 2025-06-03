import Order from '../models/Order.js';

export async function getAllOrders() {
  try {
    const allOrders = await Order.find();
    return allOrders;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
