const form = document.querySelector(".login__form");

form.addEventListener("submit", async () => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("https://fakestoreapi.com/auth/login",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    if (res.status != 200) {
        const message = await res.text();
        alert(`Error: ${message}`);
    } else {
        const json = await res.json();
        alert(`Login was successful, received auth token: ${json.token}`);
        window.location.href = "/";
    }
});