// make rider details AJAX request
document.addEventListener("DOMContentLoaded", () => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", riderDetailResponseHandler);
    xhr.responseType = "json";
    xhr.open("GET", `http://10.16.14.104/~nathan/data-service/riders.php?id=${sessionStorage.getItem("riderId")}`);
    xhr.send();
});

function riderDetailResponseHandler() {
    if (this.status === 200) {
        const rider = this.response[0];

        // set page title
        const pageTitle = document.querySelector("title");
        pageTitle.innerHTML = `${rider.name} Details - MyShowPro`;

        // set title h1 element
        const title = document.getElementById("title");
        title.innerHTML = rider.name;

        // set details
        const details = document.getElementById("details");

        const org = document.createElement("p");
        org.innerHTML = `<span class="fw-bold">Organization:</span> ${rider.org}`;
        details.appendChild(org);

        const bio = document.createElement("p");
        bio.innerHTML = `<span class="fw-bold">Bio:</span> ${rider.bio}`;
        details.appendChild(bio);

        for (showId of rider.shows.split(" ")) {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("load", showResponseHandler);
            xhr.responseType = "json";
            xhr.open("GET", `http://10.16.14.104/~nathan/data-service/shows.php?id=${showId}`);
            xhr.send();
        }
    } else console.log("Error " + this.status + ": a problem occurred in fetching rider details");
}

function showResponseHandler() {
    if (this.status === 200) {
        let show = this.response[0];

        const startDate = parseDateArray(show.startDate.split("-"), false);
        const endDate = parseDateArray(show.endDate.split("-"), false);
        const status = parseStatus(show.status);
        const lastUpdated = parseDateArray(show.lastUpdated.replace(" ",":").replaceAll("-", ":").split(":"), true);

        addShowCard(show.id, show.title, show.venue, startDate, endDate, status, lastUpdated);
    }
}

function addShowCard(id, title, venue, startDate, endDate, status, lastUpdated) {
    const body = document.querySelector("body");
    body.removeChild(document.querySelector("footer"));

    const newCard = createShowCard(id, title, venue, startDate, endDate, status, lastUpdated);
    body.appendChild(newCard);

    body.appendChild(createFooter());
}

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

function parseDateArray(dateArray, includesTime = false) {
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
