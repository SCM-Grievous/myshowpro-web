
document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.clear();

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", showResponseHandler);
    xhr.responseType = "json";
    xhr.open("GET", "http://10.16.14.104/~nathan/data-service/shows.php");
    xhr.send();
});

function showResponseHandler() {
    if (this.status === 200) {
        let data = this.response;

        for (let show of data) {
            const startDate = parseDateArray(show.startDate.split("-"), false);
            const endDate = parseDateArray(show.endDate.split("-"), false);
            const status = parseStatus(show.status);
            const lastUpdated = parseDateArray(show.lastUpdated.replace(" ", ":").replaceAll("-", ":").split(":"), true);
            console.log(lastUpdated);

            addNewCard(show.id, show.title, show.venue, startDate, endDate, status, lastUpdated);
        }
    }
}

function parseDateArray(dateArray, includesTime = false) {
    console.log(dateArray);
    if (includesTime) return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]} ${dateArray[3]}:${dateArray[4]}:${dateArray[5]}`;
    else return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
}

function parseStatus(status) {
    if (status == 0) {
        return "Active";
    } else if (status == 1) {
        return "Upcoming";
    } else if (status == 2) {
        return "Completed";
    } else return "N/A";
}

// Function to create a new card element
function createShowCard(showId, showTitle, venue, startDate, endDate, status, lastUpdated) {
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-center", "mb-2");

    const card = document.createElement("div");
    card.classList.add("card", "w-75", "bg-secondary", "p-0");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-light");

    const title = document.createElement("h5");
    title.classList.add("card-title", "fw-bold");
    title.innerHTML = `${showTitle} <small class="text-light opacity-75">${venue}</small>`;

    const text = document.createElement("p");
    text.classList.add("card-text");
    text.innerHTML = `${startDate} - ${endDate}<br>${status} <small class="text-light opacity-75">Last updated: ${lastUpdated}</small>`;

    // Append elements
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    card.appendChild(cardBody);
    row.appendChild(card);

    card.addEventListener("click", () => {
        sessionStorage.setItem("requestedShow", `${showId}`);
        console.log(showId);
        window.location.href = 'show_details.html';
    });

    return row;
}

// function to create footer
function createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("bg-dark", "text-white", "py-3", "text-center");

    const div = document.createElement("div");
    div.classList.add("container");

    const footerText = document.createElement("p");
    footerText.innerHTML = "&copy; 2023 HorseShowApp";

    div.appendChild(footerText);
    footer.appendChild(div);

    return footer;
}

// function to create load button
function createLoadMoreButton() {
    const container = document.createElement("div");
    container.classList.add("text-center");
    container.setAttribute("id", "buttonContainer");

    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "text-light");
    button.setAttribute("id", "loadButton");
    button.innerHTML = "Load more results";
    
    button.addEventListener("click", () => {
        loadCards(3);
    });

    container.appendChild(button);

    return container;
}

// Function to add new cards to the page
function addNewCard(id, title, venue, startDate, endDate, status, lastUpdated) {
    const body = document.querySelector("body");

    // removes load more button and footer element so cards appear in proper place
    body.removeChild(document.getElementById("buttonContainer"));
    body.removeChild(document.querySelector("footer"));

    const newCard = createShowCard(id, title, venue, startDate, endDate, status, lastUpdated);
    body.appendChild(newCard);

    // adds button after cards
    const loadButton = createLoadMoreButton();
    body.appendChild(loadButton);

    // adds footer after button
    const footer = createFooter();
    body.appendChild(footer);
}

function loadCards(num) {
    for (i = 0; i < num; i++) {
        addNewCard("-1", "[show_title]", "[venue]", "[start_date]", "[end_date]", "[status]", "[last_updated]");
    }
}

// // initial load of cards
// for (let show of shows) {
//     addNewCard(show);
// }