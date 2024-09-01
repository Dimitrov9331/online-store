// Функция за зареждане на диваните от JSON файла.
fetch('sofas/sofas.json')
    .then(response => response.json())
    .then(data => {
        const sofaList = document.getElementById("sofa-list")

        data.forEach(sofa => {
            // Създаване на HTML
            const productDiv = document.createElement("div");
            productDiv.className = "product";

            const img = document.createElement("img");
            img.src = sofa.image;
            img.alt = sofa.name;

            const name = document.createElement("h3");
            name.textContent = sofa.name;

            const price = document.createElement("p");
            price.textContent = `$${sofa.price.toFixed(2)}`;

            const view = document.createElement("a")
            view.href = `product.html?id=${sofa.id}`;

            const button = document.createElement("button");
            button.textContent = "Add to Cart";

            // Добавяне на елементите в създадения див

            view.appendChild(img);
            view.appendChild(name);
            view.appendChild(price);
            productDiv.appendChild(view)
            productDiv.appendChild(button);
           
            //Добавяне към главния див(списък)
            sofaList.appendChild(productDiv);
        });
    })

    .catch(error => {
        console.error('Error loading sofas', error)
    });
