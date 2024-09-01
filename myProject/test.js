function solve(total) {
    const discount = total * 0.1;
    const discTotal = total -= discount;
    console.log(discTotal.toFixed(2))
} 
solve(2699.97)

function calculateDelivery(total) {
    const deliveryCharge = document.getElementById("delivery-charge");
    let delivery = 150;
    if (total < 2000) {
        deliveryCharge.textContent = `Delivery Fee: $${delivery.toFixed(2)}`

    } else {
        deliveryCharge.textContent = "Delivery fee: Free "
    }
    updateFinalPrice(total, delivery);
}
// Функция за актуализиране на крайната цена
function updateFinalPrice(total, delivery) {
    const final = total + delivery;
    document.getElementById("final-price").textContent = `Final Price: $${final.toFixed(2)}`;
}
