// Зареждане на продуктите от localStorage и показването им в любими
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavDisplay() {
    const favItems = document.getElementById("fav-items");
    favItems.innerHTML = " " // изчистване на текущото съдържание

    favorites.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "fav-item";
        itemDiv.innerHTML = `<img src=${item.image} alt=${item.name}/>
        <div>
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        <button onclick="removeFromFav"(${index})>Remove</button>
        </div>`;

        favItems.appendChild(itemDiv);
    });
}

// Функция за премахване 
function removeFromFav(index) {
    favorites.splice(index, 1); // Премахва продукта по индекс
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Запазва актуализираната "листа"
    updateFavDisplay(); //  Актуализира показването на "листата"

}

// Актуализиране на показването на "кошницата" при зареждане на страницата
updateFavDisplay();