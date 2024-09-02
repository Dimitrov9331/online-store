function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

function updateFavoritesCount(){
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    document.getElementById("fav-count").textContent = fav.length;
}

updateCartCount();
updateFavoritesCount();