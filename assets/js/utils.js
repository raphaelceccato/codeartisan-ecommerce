export async function getCategories() {
    try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const json = res.json();

        return json;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}



export async function getProducts(category = null) {
    try {
        let url = "https://fakestoreapi.com/products";
        if (category) {
            url =  `https://fakestoreapi.com/products/category/${category}`;
        }

        const res = await fetch(url);
        const json = res.json();

        return json;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}



export async function searchProducts(text) {
    text = text.trim().toLowerCase();

    const allProducts = await getProducts();
    const filteredProducts = allProducts.filter(
        product => (product.title.toLowerCase().indexOf(text) != -1)
    );

    return filteredProducts;
}



export async function getProductInfo(id) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        return res.json();
    }
    catch (err) {
        console.error(err);
        alert("There was an error on loading the product info. Please try again later");
    }
}



export function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}



export function template(templateId, values) {
    const templateTag = document.getElementById(templateId);
    if (!templateTag)
        throw new Error(`template tag with id "${templateId}" not found`);

    let copy = document.importNode(templateTag.content, true);

    const replaceInChildren = (element) => {
        if (element.hasChildNodes()) {
            element.childNodes.forEach((child) => {
                if (child.nodeType == Node.TEXT_NODE) {
                    for (const [key, value] of Object.entries(values)) {
                        child.textContent = child.textContent.replaceAll(`{${key}}`, value);
                    }
                } else {
                    for (const attr of child.attributes) {
                        for (const [key, value] of Object.entries(values)) {
                            attr.value = attr.value.replaceAll(`{${key}}`, value);
                        }
                    }
                    replaceInChildren(child);
                }
            });
        }
    }

    replaceInChildren(copy);

    return copy;
}



export function getURLParams() {
    const url = new URL(window.location.href);
    return new URLSearchParams(url.search);
}