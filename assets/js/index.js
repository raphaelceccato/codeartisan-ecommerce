import { template, capitalizeFirstLetter, getCategories, getProducts, searchProducts, getURLParams } from "./utils.js";


const urlParams = getURLParams();
const searchText = urlParams.get("search")?.trim() ?? "";
const selectedCategory = urlParams.get("category");



window.addEventListener("load", async () => {
    const categories = await getCategories();

    const navList = document.querySelector(".nav__list");
    const asideImage = document.querySelector(".main__asideimage");



    const allProductsItem = template("nav-template", { category: "All products", url: "/" });
    navList.appendChild(allProductsItem);
    
    for (const category of categories) {
        const navItem = template("nav-template", { category: capitalizeFirstLetter(category), url: `/?category=${category}` });
        navList.appendChild(navItem);
    }

    

    const products = ((searchText.length > 0) ? 
        await searchProducts(searchText)
        : await getProducts(selectedCategory)
    );



    const productsSection = document.querySelector(".products");

    if (searchText.length > 0) {
        const resultsBox = template("results-template",
            {
                heading: `Showing results for "${searchText}"`,
                message: ((products.length > 0) ? 
                    `${products.length} products found`
                    : "Sorry, no products found"
                )
            }
        );
        productsSection.prepend(resultsBox);
    }
    else if (selectedCategory) {
        const resultsBox = template("results-template",
            {
                heading: capitalizeFirstLetter(selectedCategory),
                message: ""
            }
        );
        resultsBox.querySelector(".products__message").remove();
        productsSection.prepend(resultsBox);
    }
    else {
        document.querySelector(".products__hero").classList.remove("hidden");
    }



    const productsGrid = document.querySelector(".products__grid");

    for (const product of products) {
        const productCard = template("product-template",
            {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price.toFixed(2),
                votes: product.rating.count
            }
        );

        productCard.querySelector(".products__thumbnail").src = product.image;

        const rating = product.rating.rate;
        productCard.querySelector(".products__yellowstars").style.width = `${5.5 * rating / 5}rem`;
        productCard.querySelector(".products__greystars").style.width = `${5.5 * (5 - rating) / 5}rem`;
        productCard.querySelector(".products__greystars").style.backgroundPositionX = `-${5.5 * rating / 5}rem`;

        productsGrid.appendChild(productCard);
    }



    document.querySelector(".nav__title").addEventListener("click", () => {
        navList.classList.toggle("closed");
        sessionStorage.setItem("navClosed", navList.classList.contains("closed"));
    });

    if (!JSON.parse(sessionStorage.getItem("navClosed"))) {
        navList.classList.remove("closed");
    }
});