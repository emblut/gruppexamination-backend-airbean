
export function calculateTime(cart){
    /* return Math.floor(
        cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)
    ) */
    return cart.items.reduce((sum, current) => sum + current.qty * randomTime(), 0)
}

function randomTime(){
    const minTime = 1;
    const maxTime = 3;
    return Math.floor(Math.random() * (maxTime - minTime) +1);
}