import { Router } from 'express';
import { getAllProducts } from '../services/products.js';

const router = Router();

// GET all products
router.get('/', async (req, res, next) => {
  try {
    const result = await getAllProducts();

    if (result) {
      res.status(200).json({
        success: true,
        products: result,
      });
    } else {
      next({
        status: 404,
        message: 'No products found',
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
