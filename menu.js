const menuGrid = document.getElementById('menuGrid');
const cartItemsList = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const placeOrderButton = document.getElementById('place-order');
const resetCartButton = document.getElementById('reset-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load menu items from menu.json
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        data.menu.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span>${item.price}</span>
                <button class="add-to-cart">Add to Cart</button>
            `;

            menuItem.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(item);
            });

            menuGrid.appendChild(menuItem);
        });
    })
    .catch(error => console.error('Error loading menu:', error));

function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
}

function updateCartSummary() {
    if (cart.length === 0) {
        cartSummary.style.display = 'none';
        return;
    }

    cartSummary.style.display = 'block';
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(li);
    });

    placeOrderButton.style.display = 'inline-block';
    resetCartButton.style.display = 'inline-block';
}

resetCartButton.addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart');
    updateCartSummary();
});

placeOrderButton.addEventListener('click', () => {
    window.location.href = 'orderplc.html';
});

updateCartSummary();
