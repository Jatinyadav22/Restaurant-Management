const HomeButton = document.getElementById('HomeButton');
const OrdersButton = document.getElementById('OrdersButton');
const ReservedButton = document.getElementById('ReservedButton');

// Navigation buttons
HomeButton.addEventListener('click', () => {
  window.location.href = "homeEmp.html";
});

OrdersButton.addEventListener('click', () => {
  window.location.href = "ordered.html";
});

ReservedButton.addEventListener('click', () => {
  window.location.href = "reserved.html";
});

// Fetch reservations from backend
fetch('http://localhost:5000/api/reservations') // full path if opened locally

  .then(response => response.json())
  .then(data => {
    const reservedTable = document.querySelector('.reserved-table');

    data.forEach(reservation => {
      const reservedRow = document.createElement('div');
      reservedRow.classList.add('reserved-item');

      reservedRow.innerHTML = `
        <span>${reservation.tableNo || '-'}</span>
        <span>${reservation.name || '-'}</span>
        <span>${reservation.date || '-'}</span>
        <span>${reservation.time || '-'}</span>
        <span>${reservation.guests || '-'}</span>
        <span class="status ${reservation.status ? reservation.status.toLowerCase() : 'pending'}">
          ${reservation.status || 'Pending'}
        </span>
      `;

      reservedTable.appendChild(reservedRow);
    });
  })
  .catch(error => console.error('Error fetching reservations from backend:', error));
