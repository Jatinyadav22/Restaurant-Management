const HomeButton = document.getElementById('HomeButton');
const ResevedButton = document.getElementById('ResevedButton'); 
const OrdersButton = document.getElementById('OrdersButton');

const loginFields = document.getElementById('loginFields'); 
const loginForm = document.getElementById('loginForm'); 

function showLoginFields() {
    if (loginFields && loginForm) {
        loginFields.style.display = 'block';
        loginForm.style.display = 'block';
    }
}

HomeButton.addEventListener('click', () => {
    showLoginFields();
    window.location.href = "homeEmp.html";
});

ResevedButton.addEventListener('click', () => {
    showLoginFields();
    window.location.href = "Reserved.html"; 
});

OrdersButton.addEventListener('click', () => {
    showLoginFields();
    window.location.href = "ordered.html"; 
});
fetch('http://localhost:5000/api/orders')
    .then(response => response.json())
    .then(data => {
        const ordersTable = document.querySelector('.orders-table');

        data.forEach(order => {
            const itemList = order.cart.map(item => item.name).join(', ');

            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');

            orderItem.innerHTML = `
                <span><strong>Name:</strong> ${order.name}</span>
                <span><strong>Items:</strong> ${itemList}</span>
                <span><strong>Total:</strong> ${order.total}</span>
                <span><strong>Address:</strong> ${order.address}</span>
                <span><strong>Phone:</strong> ${order.phone}</span>
                <span class="status pending">Pending</span>
            `;

            ordersTable.appendChild(orderItem);
        });
    })
    .catch(error => console.error('❌ Error fetching orders:', error));
