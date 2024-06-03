const form = document.querySelector(".signup__form");


form.addEventListener("submit", async () => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("https://fakestoreapi.com/users",
        {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password,
                name: {
                    firstname: data.firstname,
                    lastname: data.lastname
                },
                address: {
                    city: data.city,
                    street: data.street,
                    number: data.number,
                    zipcode: data.zipcode,
                    geolocation: {
                        lat: "0",
                        long: "0"
                    }
                },
                phone: data.phone
            }),
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
        alert(`Signup was successful, received new user id: ${json.id}`);
        window.location.href = "/";
    }
});