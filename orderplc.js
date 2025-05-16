const cartDetails = document.getElementById('cart-details');
const totalPriceElement = document.getElementById('total-price');
const orderForm = document.getElementById('order-form');

// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Populate cart details
function populateCart() {
    cartDetails.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartDetails.appendChild(li);

        total += parseInt(item.price.replace('₹', ''), 10);
    });

    totalPriceElement.textContent = `${total}₹`;
}

populateCart();

// Handle form submission
orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const customerDetails = {
        name: orderForm.name.value,
        email: orderForm.email.value,
        phone: orderForm.phone.value,
        address: orderForm.address.value,
        cart: cart,
        total: totalPriceElement.textContent
    };

    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerDetails)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            localStorage.removeItem('cart');
            window.location.href = "homeCus.html";
        } else {
            alert('Failed to place order.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Server error!');
    }
});
