// Зареждане на крайната сума от количката (взета от localStorage)
document.addEventListener('DOMContentLoaded', () => {
    const finalPrice = localStorage.getItem('finalPrice');
    document.getElementById('final-price').textContent = finalPrice ? `$${finalPrice}` : '$0.00';
});

// Избиране на начин на плащане
const paymentOptions = document.querySelectorAll('.payment-option');
const checkoutBtn = document.querySelector('.checkout-btn');
let selectedPaymentMethod = null; // Съхранява избрания метод на плащане

// Обработчик за избор на метод на плащане
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(o => o.classList.remove('selected', 'error')); // Премахване на грешките и предишната селекция
        option.classList.add('selected'); // Добавяне на клас selected на избрания метод
        document.getElementById('payment-error').style.display = 'none'; // Скриване на съобщението за грешка
        selectedPaymentMethod = option.getAttribute('data-method'); // Запазване на избрания метод
        checkoutBtn.disabled = false; // Активиране на бутона
    });
});

// Функция за валидация на всички полета
function validateFields() {
    let isValid = true;

    // Обект с всички полета и съобщения за грешка
    const fields = [
        { id: 'full-name', message: 'Please enter your full name.' },
        { id: 'phone', message: 'Please enter a valid phone number.' },
        { id: 'postal-code', message: 'Please enter your postal code.' },
        { id: 'region', message: 'Please enter your region.' },
        { id: 'city', message: 'Please enter your city.' },
        { id: 'address', message: 'Please enter your address.' },
        { id: 'email', message: 'Please enter a valid email address.', validate: validateEmail } // Проверка за валиден имейл
    ];

    // Проверка на всички полета
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(`${field.id}-error`);
        
        // Проверка за валидност, като използваме допълнителна проверка, ако е дефинирана
        const isFieldValid = input.value.trim() !== '' && (!field.validate || field.validate(input.value.trim()));

        if (!isFieldValid) {
            input.classList.add('error'); // Добавяне на клас за грешка
            error.style.display = 'block'; // Показване на съобщението за грешка
            isValid = false;
        } else {
            input.classList.remove('error'); // Премахване на грешката
            error.style.display = 'none';
        }
    });

    return isValid;
}

// Функция за проверка на валиден имейл
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярно израз за проверка на имейл формат
    return emailPattern.test(email);
}

// Събитие за финализиране на поръчката
checkoutBtn.addEventListener('click', function (e) {
    let validFields = validateFields(); // Проверка на всички полета

    // Проверка дали е избран начин на плащане
    if (!selectedPaymentMethod) {
        paymentOptions.forEach(option => option.classList.add('error')); // Добавяне на клас за грешка към опциите за плащане
        document.getElementById('payment-error').style.display = 'block'; // Показване на съобщението за грешка
        validFields = false;
    }

    // Ако има грешки, спира изпълнението
    if (!validFields) {
        e.preventDefault(); // Спира изпълнението, ако има грешки
        return; // Прекратява функцията, ако има грешки
    }

    // Пренасочване към страницата за потвърждение на поръчката
    window.location.href = "orderComplete.html";
});

// Премахване на грешката при промяна на стойността в полетата
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateFields(); // Проверка и премахване на грешките при въвеждане
        }
    });
});

// Функция за актуализация на броя на артикулите в количката
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Функция за актуализация на броя на любимите продукти
function favoriteCount() {
    let fav = JSON.parse(localStorage.getItem("favorites")) || [];
    document.getElementById("fav-count").textContent = fav.length;
}

updateCartCount();
favoriteCount();
