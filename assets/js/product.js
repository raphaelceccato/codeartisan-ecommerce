import { getURLParams, getProductInfo } from "./utils.js";
import * as Cart from "./cartutils.js";


const urlParams = getURLParams();
const id = parseInt(urlParams.get("id"));


(async () => {
    if (isNaN(id)) {
        alert("Error loading product info: invalid id");
        return;
    }

    const product = await getProductInfo(id);

    document.querySelector(".product__image").src = product.image;
    document.querySelector(".product__title").textContent = product.title;
    document.querySelector(".product__id").textContent = `SKU: ${id.toString().padStart(4, "0")}`;
    document.querySelector(".product__price").textContent = `$ ${product.price.toFixed(2)}`;
    document.querySelector(".product__description").textContent = product.description;
    document.querySelector(".product__category").textContent = `Category: ${product.category}`;

    const rate = product.rating.rate;
    document.querySelector(".product__yellowstars").style.width = `${5.5 * rate / 5}rem`;
    document.querySelector(".product__greystars").style.width = `${5.5 * (5 - rate) / 5}rem`;
    document.querySelector(".product__greystars").style.backgroundPositionX = `-${5.5 * rate / 5}rem`;

    document.querySelector(".product__votes").textContent = `${product.rating.count} votes`;



    document.querySelector(".product__buy").addEventListener("click", async () => {
        const amount = parseInt(document.querySelector(".product__amount").value);

        if (isNaN(amount)) {
            alert("Invalid product amount");
            return;
        }

        Cart.addItem(id, product.price, amount);

        window.location.href = "/cart.html";
    });
})();