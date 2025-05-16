// Fetch JSON data
fetch('contact.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch the JSON file');
        }
        return response.json();
    })
    .then(data => {
        console.log('JSON Data Loaded:', data);
        setupPage(data);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

// Function to set up the page using JSON data
function setupPage(data) {
    // Dynamically populate form fields
    const form = document.querySelector('.contact-section form');
    if (data.html.body.main.form) {
        const formFields = data.html.body.main.form.fields;
        formFields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;
            label.htmlFor = field.id;

            const input = document.createElement(
                field.type === 'textarea' ? 'textarea' : 'input'
            );
            input.id = field.id;
            input.name = field.id;
            input.required = field.required;

            if (field.type !== 'textarea') {
                input.type = field.type;
            }

            if (field.maxlength) {
                input.maxLength = field.maxlength;
            }
            if (field.pattern) {
                input.pattern = field.pattern;
            }
            if (field.rows) {
                input.rows = field.rows;
            }

            form.appendChild(label);
            form.appendChild(input);
        });

        // Add Submit Button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = data.html.body.main.form.submit;
        form.appendChild(submitButton);
    }
}

// Navigation Buttons Event Listeners
const HomeButton = document.getElementById('HomeCusButton');
const MenuButton = document.getElementById('MenuButton');
const ReservationButton = document.getElementById('ReservationButton');
const ContactButton = document.getElementById('ContactButton');

[HomeButton, MenuButton, ReservationButton, ContactButton].forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = button.id.replace('Button', '').toLowerCase() + '.html';
    });
});
