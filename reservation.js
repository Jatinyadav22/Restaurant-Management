// reservation.js
fetch('reservation.json')
    .then(response => response.json())
    .then(data => {
        const navigation = data.navigation;
        navigation.forEach(item => {
            const button = document.getElementById(item.buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    window.location.href = item.action;
                });
            }
        });

        const formFields = data.formFields;
        const formElement = document.getElementById('reservationForm');

        for (let field in formFields) {
            const fieldData = formFields[field];

            const label = document.createElement('label');
            label.setAttribute('for', field);
            label.innerHTML = `<b>${fieldData.label}</b>`;

            let input;

            if (fieldData.type === 'select') {
                input = document.createElement('select');
                input.setAttribute('id', field);
                input.setAttribute('name', field);
                if (fieldData.required) input.required = true;

                fieldData.options.forEach(table => {
                    const option = document.createElement('option');
                    option.value = table;
                    option.textContent = `Table ${table}`;
                    input.appendChild(option);
                });
            } else if (fieldData.type === 'textarea') {
                input = document.createElement('textarea');
                input.setAttribute('rows', fieldData.rows);
            } else {
                input = document.createElement('input');
                input.setAttribute('type', fieldData.type);
            }

            input.setAttribute('id', field);
            input.setAttribute('name', field);
            if (fieldData.required) input.required = true;
            if (fieldData.min) input.setAttribute('min', fieldData.min);

            formElement.appendChild(label);
            formElement.appendChild(input);
            formElement.appendChild(document.createElement('br'));
        }

        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.innerHTML = 'Reserve Table';
        formElement.appendChild(submitButton);

        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {};
            Object.keys(formFields).forEach(field => {
                formData[field] = document.getElementById(field).value;
            });

            formData.status = "Reserved";

            try {
                const response = await fetch('http://localhost:5000/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    formElement.style.display = 'none';
                    document.getElementById('thankYouMessage').style.display = 'block';
                    setTimeout(() => {
                        window.location.href = 'homeCus.html';
                    }, 3000);
                } else {
                    alert("❌ Failed to submit reservation.");
                }
            } catch (error) {
                console.error("🚨 Error submitting reservation:", error);
                alert("❌ Error connecting to server.");
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
