import { Router } from 'express';
import { getProduct } from '../services/products.js';
import { updateCart, getOrCreateCart } from '../services/cart.js';
import { v4 as uuid } from 'uuid';

const router = Router();

//GET all carts

// GET a users cart
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const cart = await getOrCreateCart(id);
    res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Could not get or create cart',
      error: error.message,
    });
  }
});

// PUT an item to the cart
router.put('/', async (req, res) => {
  if (global.user) {
    const { userId } = global.user;
    const { prodId, qty } = req.body;
    const product = await getProduct(prodId);

    const result = await updateCart(userId, {
      prodId: product.prodId,
      title: product.title,
      price: product.price,
      qty: qty,
    });
    res.json({
      success: true,
      cart: result,
    });
  } else {
    let { guestId, prodId, qty } = req.body;
    const product = await getProduct(prodId);
    console.log(product);
    if (!guestId) {
      guestId = `guest-${uuid().substring(0, 5)}`;
    }

    const result = await updateCart(guestId, {
      prodId: product.prodId,
      title: product.title,
      price: product.price,
      qty: qty,
    });
    res.json({
      success: true,
      guestId: guestId,
      cart: result,
    });
  }
});

export default router;
