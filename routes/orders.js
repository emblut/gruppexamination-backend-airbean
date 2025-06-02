import { Router } from "express";
import Order from "../models/order.js";
import Cart from "../models/cart.js";
import { v4 as uuid } from "uuid";

const router = Router();

//Place an order
router.post("/", async (req, res, next) => {
  console.log('Anrop hej')

  if(!global.user /*Guest thing here*/ ){
    return res.status(401).json({
        success: false,
        message: 'You must be logged in to place an order'
    })
  }

    try {  
    const { userId } = global.user;
    console.log(userId);
    const cart = await Cart.findOne({cartId: userId});

    if(!cart || cart.items.length === 0){
        return res.status(400).json({
            success: false,
            message: 'Your cart is empty'
        })
    }

    const newOrder = new Order({
        orderId: `order-${uuid().slice(0, 8)}`,
        userId,
        items: cart.items
    });

    await newOrder.save()

    cart.items = [];
    await cart.save()
    
    res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order: newOrder
    })

  } catch (error) {
    next({
        status: error.status,
        message: error.message
    });
  }
});


export default router;