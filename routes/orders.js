import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import Order from '../models/order.js';
import { getCartById } from '../services/cart.js';
import { calculateTotal } from '../utils/cartUtils.js';
import { calculateTime } from '../utils/orderUtils.js';
import { getAllOrders, getOrdersByUserId } from '../services/orders.js';
import { checkIfUserExists } from '../services/users.js';

const router = Router();

//Place an order
router.post('/', async (req, res, next) => {
  const userId = req.body.cartId;

  const cart = await getCartById(userId);

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Your cart is empty',
    });
  }

  const newOrder = new Order({
    orderId: `order-${uuid().slice(0, 5)}`,
    userId,
    items: cart.items,
    totalPrice: calculateTotal(cart),
    orderTime: calculateTime(cart),
  });

  await newOrder.save();

  cart.items = [];
  await cart.save();

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    order: newOrder,
  });
});

export default router;

// GET all orders
router.get('/', async (req, res, next) => {
  const orders = await getAllOrders();
  if (orders) {
    res.json({
      success: true,
      orders,
    });
  } else {
    next({
      status: 404,
      message: 'Could not find any orders',
    });
  }
});

// GET user orders
router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;

  const userExists = await checkIfUserExists(userId);
  if (userExists) {
    const userOrders = await getOrdersByUserId(userId);
    if (userOrders && userOrders.length > 0) {
      res.json({
        success: true,
        orders: userOrders,
      });
    } else {
      res.json({
        success: true,
        orders: 'No orders yet',
      });
    }
  } else {
    next({
      status: 400,
      message: 'No user with that ID found',
    });
  }
});
