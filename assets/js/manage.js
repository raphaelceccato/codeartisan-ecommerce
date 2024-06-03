import { getCategories, getProductInfo, getProducts } from "./utils.js";


const addForm = document.querySelector(".add__form");
const updateForm = document.querySelector(".update__form");
const removeForm = document.querySelector(".remove__form");
const categorySelects = document.querySelectorAll(".category-select");
const productSelects = document.querySelectorAll(".product-select");


(async () => {
    const categories = await getCategories();
    const products = await getProducts();

    //category selects
    for (const select of categorySelects) {
        for (const category of categories) {
            const option = document.createElement("option");
            option.innerText = category;
            option.value = category;
            select.appendChild(option);
        }
        select.selectedIndex = 0;
    }

    //product selects
    for (const select of productSelects) {
        for (const product of products) {
            const option = document.createElement("option");
            option.innerText = product.title;
            option.value = product.id;
            select.appendChild(option);
        }
    }



    //add product

    addForm.addEventListener("submit", async () => {
        event.preventDefault();
        
        const formData = new FormData(addForm);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch("https://fakestoreapi.com/products",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (res.status != 200) {
            const message = await res.text();
            alert(`Error: ${message}`);
        } else {
            addForm.reset();
            const response = await res.text();
            alert(`Product added successfully, server response: ${response}`);
        }
    });



    //update product
    const updateSelect = document.getElementById("update-product-id");

    updateSelect.addEventListener("change", async () => {
        if (updateSelect.value == -1) {
            updateForm.reset();
            document.querySelector(".update__image").src = "";
            return;
        }

        const productInfo = await getProductInfo(updateSelect.value);

        for (const [key, value] of Object.entries(productInfo)) {
            const input = updateForm.querySelector(`input[name="${key}"]`);

            if (input) {
                input.value = value;
            }
        }
        document.getElementById("update-category").value = productInfo.category;
        document.querySelector(".update__image").src = productInfo.image;
    });

    updateForm.addEventListener("submit", async () => {
        event.preventDefault();

        const formData = new FormData(updateForm);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(`https://fakestoreapi.com/products/${data.id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (res.status != 200) {
            const json = await res.json();
            alert(`Error: ${json.message}`);
        } else {
            updateForm.reset();
            document.querySelector(".update__image").src = "";
            const response = await res.text();
            alert(`Product updated successfully, server response: ${response}`);
        }
    });



    //remove product
    const removeSelect = document.getElementById("remove-product-id");
    
    removeSelect.addEventListener("change", async () => {
        if (removeSelect.value == -1) {
            document.querySelector(".remove__image").src = "";
            return;
        }

        const productInfo = await getProductInfo(removeSelect.value);

        document.querySelector(".remove__image").src = productInfo.image;
    });

    removeForm.addEventListener("submit", async () => {
        event.preventDefault();

        const formData = new FormData(removeForm);
        const data = Object.fromEntries(formData.entries());

        if (data.id == -1) {
            alert("Please select a product to remove");
            return;
        }

        const res = await fetch(`https://fakestoreapi.com/products/${data.id}`,
            {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (res.status != 200) {
            const json = await res.json();
            alert(`Error: ${json.message}`);
        } else {
            removeForm.reset();
            document.querySelector(".remove__image").src = "";
            const response = await res.text();
            alert(`Removed product successfully, server response: ${response}`);
        }
    });
})();