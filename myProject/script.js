// Зареждане на продуктите от localStorage или създаване на нов масив
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция за добавяне на продукт в "кошницата"
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Запазва "кошницата" в localStorage
    alert(product.name + " has been added to your cart!");
    updateCartCount();
}

// Функция за актуализиране на броя на артикулите в "кошницата"
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

// Добавяне на събитие към всички бутони "Add to Cart"
document.querySelectorAll('.product button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const product = {
            name: productElement.querySelector('h3').textContent,
            price: productElement.querySelector('p').textContent.replace('$', ''),
            image: productElement.querySelector('img').src
        };
        addToCart(product);
    });
});

// Актуализиране на броя на артикулите в "кошницата" при зареждане на страницата
updateCartCount();
