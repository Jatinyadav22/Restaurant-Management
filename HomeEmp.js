// Fetch the JSON File
fetch('HomeEmp.json')
    .then((response) => response.json())
    .then((jsonData) => {
        // Render Header
        const header = document.getElementById("header-container");
        const headerImg = jsonData.html.body.header.img;
        const navButtons = jsonData.html.body.header.nav.ul.buttons;

        header.innerHTML = `
            <img src="${headerImg.src}" alt="${headerImg.alt}" style="width: ${headerImg.style.width}; height: ${headerImg.style.height};">
            <nav>
                <ul class="${jsonData.html.body.header.nav.ul.class}">
                    ${navButtons
                        .map(
                            (button) =>
                                `<button id="${button.id}" onclick="location.href='${button.link}'">${button.text}</button>`
                        )
                        .join("")}
                </ul>
            </nav>
        `;

        // Render Main Sections
        const main = document.getElementById("main-container");
        const sections = jsonData.html.body.main.sections;

        main.innerHTML = sections
            .map((section) => {
                if (section.id === "map") {
                    return `
                        <section id="${section.id}">
                            <h2>${section.title}</h2>
                            <iframe src="${section.iframe.src}" width="${section.iframe.width}" height="${section.iframe.height}" style="${Object.entries(
                        section.iframe.style
                    )
                        .map(([key, value]) => `${key}: ${value}`)
                        .join("; ")}" allowfullscreen="${section.iframe.allowfullscreen}" loading="${section.iframe.loading}"></iframe>
                        </section>`;
                }
                const images = section.images
                    ? section.images
                          .map(
                              (img) =>
                                  `<img src="${img.src}" alt="${img.alt}" class="${img.class}">`
                          )
                          .join("")
                    : "";
                return `
                    <section id="${section.id}">
                        <h2>${section.link ? `<a href="${section.link.href}" class="button">${section.link.text}</a>` : section.title}</h2>
                        <p>${section.description}</p>
                        ${images}
                    </section>`;
            })
            .join("");

        // Render Footer
        const footer = document.getElementById("footer-container");
        footer.innerHTML = `<p>${jsonData.html.body.footer.text}</p>`;
    })
    .catch((error) => console.error("Error loading JSON:", error));
