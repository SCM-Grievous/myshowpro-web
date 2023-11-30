// get load of rider cards
document.addEventListener("DOMContentLoaded", () => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", riderResponseHandler);
    xhr.responseType = "json";
    xhr.open("GET", "http://10.16.14.104/~nathan/data-service/riders.php");
    xhr.send();
});

function riderResponseHandler() {
    if (this.status === 200) {
        let data = this.response;
        //console.log(data);
        for (let rider of data) {
            // format date string
            const dateArray = rider.lastUpdated.replace(" ", ":").replaceAll("-", ":").split(":");
            let dateStr = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]} ${dateArray[3]}:${dateArray[4]}:${dateArray[5]}`;

            addNewCard(rider.id, rider.name, rider.org, dateStr);
        }
    } else {
        console.log("Error " + this.status + ": problem occurred when loading rider data");
    }
}

// Function to create a new card element
function createRiderCard(riderId, riderName, org, lastUpdated) {
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-center", "mb-2");

    const card = document.createElement("div");
    card.classList.add("card", "w-75", "bg-secondary", "p-0");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-light");

    const title = document.createElement("h5");
    title.classList.add("card-title", "fw-bold");
    title.innerHTML = `${riderName} <small class="text-light opacity-75">${org}</small>`;

    const text = document.createElement("p");
    text.classList.add("card-text");
    text.innerHTML = `<small class="text-light opacity-75">Last updated: ${lastUpdated}</small>`;

    // Append elements
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    card.appendChild(cardBody);
    row.appendChild(card);

    card.addEventListener("click", () => {
        sessionStorage.setItem("riderId", `${riderId}`);
        console.log(riderId);
        window.location.href = "rider_details.html";
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
function addNewCard(id, name, org, lastUpdated) {
    const body = document.querySelector("body");

    // removes load more button and footer element so cards appear in proper place
    body.removeChild(document.getElementById("buttonContainer"));
    body.removeChild(document.querySelector("footer"));

    const newCard = createRiderCard(id, name, org, lastUpdated);
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
        addNewCard(-1, "[rider_name]", "[organization]", "[last_updated]");
    }
}