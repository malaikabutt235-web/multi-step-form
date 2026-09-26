const steps = document.querySelectorAll(".step");

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const progressBar = document.getElementById("progressBar");
const stepText = document.getElementById("stepText");
const percentage = document.getElementById("percentage");

let currentStep = 0;

function showStep() {

    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    let progress = ((currentStep + 1) / steps.length) * 100;

    progressBar.style.width = progress + "%";

    stepText.textContent =
        "Step " + (currentStep + 1) + " of " + steps.length;

    percentage.textContent = progress + "%";

    previousButton.style.display =
        currentStep === 0 ? "none" : "block";

    if (currentStep === steps.length - 1) {
        nextButton.textContent = "Submit";
        createSummary();
    } else {
        nextButton.textContent = "Next";
    }
}

function clearErrors() {
    document.querySelectorAll("small").forEach(function(error) {
        error.textContent = "";
    });
}

function validateStep() {

    clearErrors();

    let valid = true;

    if (currentStep === 0) {

        if (document.getElementById("name").value.trim() === "") {
            document.getElementById("nameError").textContent =
                "Please enter your name.";
            valid = false;
        }

        if (document.getElementById("email").value.trim() === "") {
            document.getElementById("emailError").textContent =
                "Please enter your email.";
            valid = false;
        }
    }

    if (currentStep === 1) {

        if (document.getElementById("phone").value.trim() === "") {
            document.getElementById("phoneError").textContent =
                "Please enter your phone number.";
            valid = false;
        }

        if (document.getElementById("city").value.trim() === "") {
            document.getElementById("cityError").textContent =
                "Please enter your city.";
            valid = false;
        }
    }

    if (currentStep === 2) {

        if (document.getElementById("subject").value === "") {
            document.getElementById("subjectError").textContent =
                "Please select a subject.";
            valid = false;
        }

        if (document.getElementById("message").value.trim() === "") {
            document.getElementById("messageError").textContent =
                "Please write a message.";
            valid = false;
        }
    }

    return valid;
}

function createSummary() {

    document.getElementById("summary").innerHTML = `
        <strong>Name:</strong>
        ${document.getElementById("name").value}<br>

        <strong>Email:</strong>
        ${document.getElementById("email").value}<br>

        <strong>Phone:</strong>
        ${document.getElementById("phone").value}<br>

        <strong>City:</strong>
        ${document.getElementById("city").value}<br>

        <strong>Subject:</strong>
        ${document.getElementById("subject").value}<br>

        <strong>Message:</strong>
        ${document.getElementById("message").value}
    `;
}

nextButton.addEventListener("click", function() {

    if (currentStep < steps.length - 1) {

        if (!validateStep()) {
            return;
        }

        currentStep++;
        showStep();

    } else {

        document.getElementById("success").textContent =
            "Form submitted successfully!";
    }
});

previousButton.addEventListener("click", function() {

    if (currentStep > 0) {
        currentStep--;
        showStep();
    }
});

showStep();
