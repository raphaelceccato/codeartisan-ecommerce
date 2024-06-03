import * as Cart from "./cartutils.js";


(async () => {
    const cartAmount = Cart.getTotalAmount();
    const cartPrice = (Cart.getTotalPrice()).toFixed(2);

    if (cartAmount == 0) {
        document.querySelector(".header__cartamount").remove();
    } else {
        document.querySelector(".header__cartamount").textContent = cartAmount;
    }
    
    document.querySelector(".header__cartprice").textContent = `$ ${cartPrice}`;


    
    document.querySelector(".header__button").addEventListener("click", () => {
        document.querySelector(".header__links").classList.toggle("closed");
    });
})();