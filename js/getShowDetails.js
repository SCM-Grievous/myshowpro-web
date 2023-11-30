// make show details AJAX request
document.addEventListener("DOMContentLoaded", () => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", showDetailResponseHandler);
    xhr.responseType = "json";
    xhr.open("GET", `http://10.16.14.104/~nathan/data-service/shows.php?id=${sessionStorage.getItem("requestedShow")}`);
    xhr.send();
});

// get rings for selected show
document.addEventListener("DOMContentLoaded", () => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", ringListResponseHandler);
    xhr.responseType = "json";
    xhr.open("GET", `http://10.16.14.104/~nathan/data-service/ringsOld.php?showId=${sessionStorage.getItem("requestedShow")}`);
    xhr.send();
});

function showDetailResponseHandler() {
    if (this.status === 200) {
        const reqShow = this.response[0];

        // set page title
        const pageTitle = document.querySelector("title");
        pageTitle.innerHTML = `${reqShow.title} Details - MyShowPro`;

        // set title h1 element
        const title = document.getElementById("title");
        title.innerHTML = reqShow.title;

        // set details
        const details = document.getElementById("details");
        
        const venue = document.createElement("p");
        venue.innerHTML = `<span class="fw-bold">Venue:</span> ${reqShow.venue}`;
        details.appendChild(venue);

        const date = document.createElement("p");
        date.innerHTML = `<span class="fw-bold">Date(s):</span> ${parseDateArray(reqShow.startDate.split("-"))} - ${parseDateArray(reqShow.endDate.split("-"))} (${parseShowStatus(reqShow.status)})`;
        details.appendChild(date);

        const loc = document.createElement("p");
        loc.innerHTML = `<span class="fw-bold">Location:</span> ${reqShow.location}`;
        details.appendChild(loc);

        const desc = document.createElement("p");
        desc.innerHTML = `<span class="fw-bold">Description:</span> ${reqShow.description}`;
        details.appendChild(desc);
    }
}

function ringListResponseHandler() {
    if (this.status === 200) {
        const data = this.response;

        for (let ring of data) {
            const status = parseRingStatus(ring.status);
            const lastUpdated = parseDateArray(ring.lastUpdated.split(":"), true);

            addRingCard(ring.id, ring.name, status, ring.currentClass, lastUpdated);
        }
    }
}

function addRingCard(ringId, name, status, currentClass, lastUpdated) {
    const body = document.querySelector("body");
    body.removeChild(document.querySelector("footer"));

    const newCard = createRingCard(ringId, name, status, currentClass, lastUpdated);
    body.appendChild(newCard);

    body.appendChild(createFooter());
}

function createRingCard(ringId, name, status, currentClass, lastUpdated) {
    const row = document.createElement("div");
    row.classList.add("row", "justify-content-center", "mb-2");

    const card = document.createElement("div");
    card.classList.add("card", "w-75", "bg-secondary", "p-0");
    card.addEventListener("click", () => {
        sessionStorage.setItem("requestedRing", `${ringId}`);
        console.log(ringId);
        window.location.href = "#";
    });

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-light");

    const title = document.createElement("h5");
    title.classList.add("card-title", "fw-bold");
    title.innerHTML = name;

    const currentClassText = document.createElement("p");
    currentClassText.classList.add("card-text", "my-0");
    currentClassText.innerHTML = `Current class: ${currentClass}`;

    const statusText = document.createElement("p");
    statusText.classList.add("card-text", "my-0");
    statusText.innerHTML = `${status} <small class="text-light opacity-75">Last updated: ${lastUpdated}</small>`;

    cardBody.appendChild(title);
    cardBody.appendChild(currentClassText);
    cardBody.appendChild(statusText);

    card.appendChild(cardBody);
    row.appendChild(card);

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseDateArray(dateArray, includesTime = false) {
    if (includesTime) return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]} ${dateArray[3]}:${dateArray[4]}:${dateArray[5]}`;
    else return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
}

function parseShowStatus(status) {
    if (status == 0) {
        return "Active";
    } else if (status == 1) {
        return "Upcoming";
    } else if (status == 2) {
        return "Completed";
    } else return "N/A";
}

function parseRingStatus(status) {
    if (status == 0) {
        return "Active";
    } else if (status == 1) {
        return "On Hold";
    } else if (status == 2) {
        return "Closed";
    } else if (status == 3) {
        return "Inactive";
    } else return "N/A";
}