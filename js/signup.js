document.addEventListener("DOMContentLoaded", () => {
    // add event listener to submit button
    let submitBtn = document.getElementById("signupSubmit");
    submitBtn.addEventListener("click", (ev) => {
        // prevent submitting the form
        ev.preventDefault();

        // form validation
        let emailRegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        let emailField = document.getElementById("email");
        
        if (!emailRegExp.test(emailField.value)) {
            invalidFieldMessage("Please enter a valid email address");
        } else {
            clearErrorMessage();
            window.location.href = "shows.html";
        }
    });
});

function invalidFieldMessage(msg) {
    let msgDiv = document.getElementById("invalidMsg");

    msgDiv.classList.remove("hidden");
    msgDiv.innerHTML = msg;
}

function clearErrorMessage() {
    let msgDiv = document.getElementById("invalidMsg");

    msgDiv.classList.add("hidden");
    msgDiv.innerHTML = "";
}