import Cart from '../models/cart.js';

export async function getCartById(userId){
  try{
    let cart = await Cart.findOne({ cartId: userId });
    return cart
  }catch(error){
    console.log(error.message)
    return null
  }
}

export async function getOrCreateCart(userId) {
  try {
    let cart = await Cart.findOne({ cartId: userId });
    if (!cart) {
      cart = await Cart.create({
        cartId: userId,
        items: [],
      });
    }
    return cart;
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

export async function updateCart(userId, product) {
  try {
    const cart = await getOrCreateCart(userId);
    if (!cart) {
      throw new Error('Could not retrieve cart');
    }

    const item = cart.items.find((i) => i.prodId === product.prodId);
    if (item) {
      item.qty = product.qty;
    } else {
      cart.items.push(product);
    }

    if (product.qty === 0) {
      console.log('Radera!');
      cart.items = cart.items.filter((i) => i.prodId !== product.prodId);
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
