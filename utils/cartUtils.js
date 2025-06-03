export function calculateTotal(cart) {
  return Math.floor(
    cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  );
}
