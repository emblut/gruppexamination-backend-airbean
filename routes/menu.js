import { Router } from 'express';
import Product from '../models/product.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

export default router;
