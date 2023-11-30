let ringId = 0;

let showForm = document.getElementById("showForm");
let addBtn = document.getElementById("addRingButton");

addBtn.addEventListener("click", (ev) => {
    ev.preventDefault();

    showForm.removeChild(document.getElementById("bruh"));
    showForm.removeChild(document.getElementById("submitBtn"));
    showForm.removeChild(document.getElementById("footer"));

    const ringCard = document.createElement("div");
    ringCard.classList.add("card", "bg-secondary", "mb-3");
    ringCard.id = `ring${ringId}Card`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-light");

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", `ring${ringId}Name`);
    nameLabel.classList.add("form-label")
    nameLabel.innerText = "Ring Name";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.classList.add("form-control");
    nameInput.name = `ring${ringId}Name`;
    nameInput.id = `ring${ringId}Name`;
    nameInput.placeholder = "Enter ring name";

    const detailsLabel = document.createElement("label");
    detailsLabel.setAttribute("for", `ring${ringId}Details`);
    detailsLabel.classList.add("form-label")
    detailsLabel.innerText = "Details";

    const detaialsInput = document.createElement("input");
    detaialsInput.type = "text";
    detaialsInput.classList.add("form-control");
    detaialsInput.name = `ring${ringId}Details`;
    detaialsInput.id = `ring${ringId}Details`;
    detaialsInput.placeholder = "Details...";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("btn", "btn-danger", "btn-sm", "mt-2");
    removeButton.setAttribute("onclick", "removeRingCard(this)");
    removeButton.innerText = "Remove ring";

    cardBody.appendChild(nameLabel);
    cardBody.appendChild(nameInput);
    cardBody.appendChild(detailsLabel);
    cardBody.appendChild(detaialsInput);
    cardBody.appendChild(removeButton);

    ringCard.appendChild(cardBody);

    showForm.appendChild(ringCard);

    let hr = document.createElement("hr");
    hr.id = "bruh";
    showForm.appendChild(hr);

    showForm.appendChild(createSubmitButton());
    showForm.appendChild(createFooter());

    ringId++;
});

function removeRingCard(button) {
    const ringCard = button.parentNode.parentNode;
    showForm.removeChild(ringCard);
}

function createSubmitButton() {
    let submitButton = document.createElement("button");
    submitButton.id = "submitBtn";
    submitButton.type = "submit";
    submitButton.classList.add("btn", "w-100", "btn-success");
    submitButton.innerText = "Post Show";

    return submitButton;
}

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