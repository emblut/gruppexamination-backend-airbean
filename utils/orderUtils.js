export function calculateTime(cart) {
  return cart.items.reduce(
    (sum, current) => sum + current.qty * randomTime(),
    0
  );
}

function randomTime() {
  const minTime = 1;
  const maxTime = 3;
  return Math.floor(Math.random() * (maxTime - minTime) + 1);
}
