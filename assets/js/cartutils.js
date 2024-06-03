//since the fake store api doesn't let us make real changes in the database, let's make a local cart in the browser


export function getItems() {
    const cartStr = localStorage.getItem("cart") ?? "{}";
    const cart = JSON.parse(cartStr);
    return cart;
}



export function addItem(id, unitPrice, amount) {
    const cart = getItems();

    if (cart[id]) {
        cart[id].amount += amount;
    } else {
        cart[id] = {
            unitPrice,
            amount
        };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}



export function changeItemAmount(id, amount) {
    const cart = getItems();

    if (cart[id]) {
        cart[id].amount = amount;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}



export function removeItem(id) {
    const cart = getItems();

    if (cart[id]) {
        delete cart[id];
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}



export function clear() {
    localStorage.setItem("cart", JSON.stringify({}));
}



export function getTotalAmount() {
    const cart = getItems();

    let count = 0;
    for (const id of Object.keys(cart)) {
        count += cart[id].amount;
    }

    return count;
}



export function getTotalPrice() {
    const cart = getItems();

    let total = 0;
    for (const id of Object.keys(cart)) {
        total += cart[id].unitPrice * cart[id].amount;
    }

    return total;
}