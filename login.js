fetch('login.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }
        return response.json();
    })
    .then(data => {
        initializeFromJSON(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function initializeFromJSON(jsonData) {
    const container = document.querySelector('.container');

    if (jsonData.htmlStructure) {
        const structure = jsonData.htmlStructure;

        // Title
        document.title = structure.title;

        // Logo
        if (structure.elements.logo) {
            const logoContainer = document.createElement('div');
            logoContainer.classList.add('logo-container');
            const logoImage = document.createElement('img');
            logoImage.src = structure.elements.logo.src || "Logo.png";
            logoImage.alt = structure.elements.logo.alt || "Restaurant Logo";
            logoImage.classList.add('logo');
            logoContainer.appendChild(logoImage);
            container.appendChild(logoContainer);
        }

        // Welcome message and instruction
        if (structure.elements.welcomeMessage) {
            const welcomeMessage = document.createElement('h2');
            welcomeMessage.innerText = structure.elements.welcomeMessage;
            container.appendChild(welcomeMessage);
        }

        if (structure.elements.instruction) {
            const instruction = document.createElement('p');
            instruction.innerText = structure.elements.instruction;
            container.appendChild(instruction);
        }

        // Buttons (Customer/Employee)
        if (structure.elements.buttons) {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            // Customer button
            const customerButton = document.createElement('button');
            customerButton.id = structure.elements.buttons.customerButton.id;
            customerButton.innerText = structure.elements.buttons.customerButton.text;
            customerButton.addEventListener('click', () => {
                window.location.href = structure.elements.buttons.customerButton.redirectUrl;
            });
            buttonContainer.appendChild(customerButton);

            // Employee button
            const employeeButton = document.createElement('button');
            employeeButton.id = structure.elements.buttons.employeeButton.id;
            employeeButton.innerText = structure.elements.buttons.employeeButton.text;
            employeeButton.addEventListener('click', showLoginForm);
            buttonContainer.appendChild(employeeButton);

            container.appendChild(buttonContainer);
        }

        // Login form (initially hidden)
        if (structure.elements.loginForm) {
            const loginForm = document.createElement('form');
            loginForm.id = structure.elements.loginForm.id;
            loginForm.style.display = 'none';
            loginForm.onsubmit = (event) => loginHandler(event);

            // Fields
            const loginFields = document.createElement('div');
            loginFields.id = 'loginFields';

            structure.elements.loginForm.fields.forEach(field => {
                const label = document.createElement('label');
                label.setAttribute('for', field.id);
                label.innerText = field.label;

                const input = document.createElement('input');
                input.type = field.inputType;
                input.id = field.id;
                input.name = field.name;
                if (field.required) input.required = true;

                loginFields.appendChild(label);
                loginFields.appendChild(input);
            });

            loginForm.appendChild(loginFields);

            // Submit button
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.innerText = 'Login';
            submitButton.classList.add('submit-btn');
            loginForm.appendChild(submitButton);

            container.appendChild(loginForm);
        }
    }
}

function showLoginForm() {
    const form = document.getElementById('loginForm');
    form.style.display = 'block';
}

function loginHandler(event) {
    event.preventDefault();

    // Simulate login (this can be extended to validate credentials)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username == "Jatin" && password =="1234") {
        alert("Login Successful");
        window.location.href = "homeEmp.html";
        // Redirect to employee dashboard or perform other actions
    } else {
        alert("'Invalid username or password. Please try again.'.");
    }
}
