// Извличане на ID от URL параметрите
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

let product; // Дефинираме променливата product глобално

// Зареждане на данни от JSON
fetch('sofas/sofas.json')
    .then(response => response.json())
    .then(products => {
        // Намиране на продукта по ID
        product = products.find(p => p.id === productId);

        if (product) {
            // Актуализиране на HTML съдържанието
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`
            document.getElementById("product-image").src = product.image;

            function loadReviews() {
                const reviewsFromStorage = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
                const combinedReviews = [...product.reviews, ...reviewsFromStorage]; // Комбиниране на ревютата от JSON и localStorage
                displayReviews(combinedReviews);
            }

            loadReviews();  // Зареждане на ревюта (от JSON + localStorage)

        } else {
            document.querySelector("main").innerHTML = `<p>Product not found.</p>`;
        }

    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });

// Функция за обновяване на брояча на количката
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Добавяне на продукти в кошницата
document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(product.name + " has been added to your cart!");
        updateCartCount();  // Обновяване на брояча след добавяне
    } else {
        alert('Product not found.');
    }
});

updateCartCount();

// Функция за показване на ревюта
function displayReviews(reviews) {
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = "";

    //  Изчисляване на средния рейтинг
    const { averageRating, reviewCount } = calculateAverageRating(reviews);

    // Показване на средния рейтинг и броя на ревютата
    document.getElementById('average-rating').innerHTML = `Rating: ${averageRating.toFixed(1)} &#9733; (${reviewCount} reviews)`;

    reviews.forEach(review => {
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";
        reviewItem.innerHTML = `
            <p><strong>${review.reviewer}</strong></p>
            <p>${review.comment}</p>
            <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
        `;

        reviewsList.appendChild(reviewItem);
    });
}

// Съхранение на ново ревю
function saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
    reviews.push(review);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
    loadReviews(); // Презареждане на ревютата след добавяне
}

// Логика за звезден рейтинг
let selectedRating = 0;
document.querySelectorAll('.rating-stars .star').forEach(star => {
    star.addEventListener("click", function () {
        selectedRating = parseInt(this.getAttribute("data-value"));
        document.querySelectorAll(".rating-stars .star").forEach(star => {
            star.classList.toggle('selected', parseInt(star.getAttribute('data-value')) <= selectedRating);
        });
    });
});

// Обработка на формата за добавяне на ревю
document.getElementById('submit-review-btn').addEventListener('click', () => {
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewComment = document.getElementById('review-text').value;

    if (reviewerName && reviewComment && selectedRating > 0) {
        const newReview = {
            reviewer: reviewerName,
            comment: reviewComment,
            rating: selectedRating
        };

        saveReview(newReview); // Запазване на новото ревю

        // Изчистване на полетата
        document.getElementById('reviewer-name').value = '';
        document.getElementById('review-text').value = '';
        document.querySelectorAll(".rating-stars .star").forEach(star => star.classList.remove("selected"));
        alert("Thank you for your review!");
    } else {
        alert("Please fill in all fields and select a rating.");
    }
});

//Функция за изчисляване на средния рейтинг и броя ревюта

function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
        return { averageRating: 0, reviewCount: 0 }; // Ако няма ревюта връща 0
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0) // сумиране на всики рейтинги
    const averageRating = totalRating / reviews.length // среден рейтинг
    return { averageRating, reviewCount: reviews.length } // връща средния рейтинг и броя ревюта
}

// Добавяне на продукт в любими
document.getElementById("add-to-favorites").addEventListener("click", () => {
    if (product) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Проверка дали  продукта е вече в любими
        if (favorites.some(fav => fav.id === productId)) {
            alert(product.name + "is already in your favorites!");
        } else {
            favorites.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateFavoritesCount();
            alert(product.name + "has been added to your favorites!");
        }
    } else {
        alert("Product not found.")
    }
});

// Функция за обновяване на броя на любимите
function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(`You have ${favorites.length} favorites`); // За пример може да покажем в конзолата броя
}

// Обновяване на броя на любимите при зареждане на страницата
updateFavoritesCount();
