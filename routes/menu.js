import { Router } from 'express';
import { getAllProducts } from '../services/products.js';

const router = Router();

// GET all products
router.get('/', async (req, res, next) => {
  const result = await getAllProducts();

  if (result) {
    res.json({
      success: true,
      products: result,
    });
  } else {
    next({
      status: 404,
      message: 'No products found',
    });
  }
});

export default router;
