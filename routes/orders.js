import { Router } from "express";
import Order from "../models/order.js";
import Cart from "../models/cart.js";
import { v4 as uuid } from "uuid";
import { getCartById } from "../services/cart.js";

const router = Router();

//Place an order
router.post("/", async (req, res, next) => {

  const userId = req.body.cartId;

  const cart = await getCartById(userId)
  
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Your cart is empty",
    });
  }

  const newOrder = new Order({
    orderId: `order-${uuid().slice(0, 8)}`,
    userId,
    items: cart.items,
  });

  await newOrder.save();

  cart.items = [];
  await cart.save();

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order: newOrder,
  });

});

export default router;
