import * as Cart from "./cartutils.js";
import { getProductInfo, template } from "./utils.js";


const cartList = document.querySelector(".cart__list");



(async () => {
    const items = Cart.getItems();
    const itemCount = Object.keys(items).length;
    const totalPrice = Cart.getTotalPrice();

    document.querySelector(".cart__amount").textContent = `There are ${(itemCount > 0) ? itemCount : "no"} item(s) in your cart`;
    document.querySelector(".cart__total .cart__price").textContent = `$ ${totalPrice.toFixed(2)}`;

    for (const id of Object.keys(items)) {
        const amount = items[id].amount;
        const product = await getProductInfo(id);

        const itemElement = template("item-template",
            {
                ...product,
                price: `$ ${product.price.toFixed(2)}`,
                amount
            }
        );
        itemElement.querySelector(".cart__thumbnail").src = product.image;
        itemElement.querySelector(".cart__remove").addEventListener("click", async () => {
            event.preventDefault();
            Cart.removeItem(id);
            window.location.reload();
        });
        cartList.appendChild(itemElement);
    }

    document.querySelector(".cart__clear").addEventListener("click", async () => {
        Cart.clear();
        window.location.reload();
    })
})();