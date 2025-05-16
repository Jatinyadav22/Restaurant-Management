// Fetch JSON data from the file
fetch('homecus.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON data
    })
    .then(data => {
        console.log('JSON Data:', data); // Log JSON structure for debugging
        populatePage(data); // Dynamically populate the page with JSON data
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

// Function to populate the page with JSON data
function populatePage(data) {
    // Update page title
    document.title = data.html.head.title;

    // Populate header
    const header = document.getElementById('header');
    if (data.html.body.header) {
        const img = document.createElement('img');
        img.src = data.html.body.header.img.src;
        img.alt = data.html.body.header.img.alt;
        Object.assign(img.style, data.html.body.header.img.style);
        header.appendChild(img);

        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        ul.className = data.html.body.header.nav.ul.class;

        data.html.body.header.nav.ul.button.forEach(buttonData => {
            const button = document.createElement('button');
            button.id = buttonData.id;
            button.textContent = buttonData.text;

            // Updated logic to handle specific button redirection
            button.addEventListener('click', () => {
                if (buttonData.text.toLowerCase() === 'home') {
                    window.location.href = 'homeCus.html'; // Redirect to homeCus.html
                } else {
                    window.location.href = `${buttonData.text.toLowerCase()}.html`;
                }
            });

            ul.appendChild(button);
        });

        nav.appendChild(ul);
        header.appendChild(nav);
    }

    // Populate main content
    const main = document.getElementById('main-content');
    data.html.body.main.section.forEach(section => {
        const sectionEl = document.createElement('section');
        sectionEl.id = section.id;

        if (section.h1) {
            const h1 = document.createElement('h1');
            h1.textContent = section.h1;
            sectionEl.appendChild(h1);
        }

        if (section.p) {
            const p = document.createElement('p');
            p.textContent = section.p;
            sectionEl.appendChild(p);
        }

        if (section.img) {
            section.img.forEach(imgData => {
                const img = document.createElement('img');
                img.src = imgData.src;
                img.alt = imgData.alt;
                img.className = imgData.class;
                sectionEl.appendChild(img);
            });
        }

        if (section.h2) {
            const h2 = document.createElement('h2');
            h2.textContent = section.h2;
            sectionEl.appendChild(h2);
        }

        if (section.div && section.div.iframe) {
            const div = document.createElement('div');
            div.id = section.div.id;

            const iframe = document.createElement('iframe');
            iframe.src = section.div.iframe.src;
            iframe.width = section.div.iframe.width;
            iframe.height = section.div.iframe.height;
            iframe.style.border = section.div.iframe.style;
            iframe.allowFullscreen = section.div.iframe.allowfullscreen;
            iframe.loading = section.div.iframe.loading;

            div.appendChild(iframe);
            sectionEl.appendChild(div);
        }

        main.appendChild(sectionEl);
    });

    // Populate footer
    const footer = document.getElementById('footer');
    if (data.html.body.footer) {
        const p = document.createElement('p');
        p.innerHTML = data.html.body.footer.p;
        footer.appendChild(p);
    }
}
