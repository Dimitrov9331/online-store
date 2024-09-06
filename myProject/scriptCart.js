// Зареждане на продуктите от localStorage и показването им в кошницата

let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").textContent = cart.length;



function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Изчиства текущото съдържание
    let total = 0;
    let subtotal = 0
    cart.forEach((item, index) => {
        total += Number(item.price);
        subtotal = total;

        calculateDelivery(subtotal)

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
             <img src="${item.image}" alt="${item.name}"/>
             <div>
                 <h4>${item.name}</h4>
                 <p>$${item.price}</p>
                 <button onclick="removeFromCart(${index})">Remove</button>
             </div>
         `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
    document.getElementById("subtotal-price").textContent = `$${subtotal.toFixed(2)}`

    // Обработка на промо кодовете
    document.getElementById('apply-promo-code-btn').addEventListener('click', () => {
        const promoCode = document.getElementById("promo-input").value.trim();
        let total = parseFloat(document.getElementById('total-price').textContent.replace("$", ""));
        const discountMsg = document.getElementById("discount-msg");

        if (promoCode === "disc10") {
            //Изваждане на отстъпката
            const discount = total * 0.1;
            const discTotal = total -= discount;

            document.getElementById("total-price").textContent = `$${discTotal.toFixed(2)}`
            document.getElementById("final-price").textContent = `Final Price: $${discTotal.toFixed(2)}`;
            document.getElementById('promo-input').disabled = true // Заключва и бутона
            document.getElementById('apply-promo-code-btn').disabled = true;
            discountMsg.textContent = 'Promo code applied successfully! 10%.';
            discountMsg.classList.remove('error');

  // Записване на крайната цена в localStorage
        localStorage.setItem('finalPrice', discTotal.toFixed(2));
        } else {
            discountMsg.textContent = 'Invalid promo code. Please try again.';
            discountMsg.classList.add('error');
        }

    });

    // Функция за изчисляване на таксата за доставка
    function calculateDelivery(subtotal) {
        const deliveryCharge = document.getElementById("delivery-charge");
        let delivery = 150;
        if (subtotal < 2000) {
            deliveryCharge.textContent = `Delivery Fee: $${delivery.toFixed(2)}`


        } else {
            deliveryCharge.textContent = "Delivery fee: Free "
        }
        updateFinalPrice(total, delivery);
    }
    // Функция за актуализиране на крайната цена
    function updateFinalPrice(total, delivery) {
        let final;
        if (total < 2000) {
             final = total + delivery;
            document.getElementById("final-price").textContent = `Final Price: $${final.toFixed(2)}`;
        } 
        final = total;
        document.getElementById("final-price").textContent = `Final Price: $${final.toFixed(2)}`;

         // Записване на крайната цена в localStorage
     localStorage.setItem('finalPrice', final.toFixed(2));
    }
}

// Функция за премахване на продукт от "кошницата"
function removeFromCart(index) {
    cart.splice(index, 1); // Премахва продукта по индекс
    localStorage.setItem('cart', JSON.stringify(cart)); // Запазва актуализираната "кошница"
    updateCartDisplay(); // Актуализира показването на "кошницата"
    updateCartCount();
}

// Обработва финализиране на поръчката
document.getElementById("finalize-order-btn").addEventListener('click', () => {
    window.location.href = "checkout.html" //// Пренасочване към страницата за данни на потребителя
});

//Обновяване на броя любими продукти
function favoriteCount() {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    document.getElementById("fav-count").textContent = fav.length;
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}


// Актуализиране на показването на "кошницата" при зареждане на страницата
updateCartCount();
updateCartDisplay();
favoriteCount();

// Добавяне на събитие към бутона за финализиране на поръчката
document.getElementById("finalize-order-btn").addEventListener("click", ()=>{
    // Пренасочване към страницата checkout.html
    window.location.href = "checkout.html"
});

