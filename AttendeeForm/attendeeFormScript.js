document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const errorContainer = document.getElementById("errorContainer");
  const formMessage = document.getElementById("formMessage");

  const attendeeData = JSON.parse(localStorage.getItem("attendeeData")) || [];
  console.log("Loaded attendee data from localStorage:", attendeeData);

  function displayError(message) {
    errorContainer.textContent = message;
    errorContainer.style.color = "red";
  }

  function saveAttendeeData(data) {
    console.log("Saving new attendee data:", data);
    attendeeData.push(data);
    localStorage.setItem("attendeeData", JSON.stringify(attendeeData));
  }

  function handleAttendeeSubmission(event) {
    event.preventDefault();

    const name = form.name.value.trim();
    const location = form.location.value.trim();
    const date = form.date.value;
    const contactInfo = form.contactInfo.value.trim();
    const contactInfoRegex =
      /^[\w\.\-]+@[a-zA-Z0-9]+?\.[a-zA-Z]{2,3}$|^\(?[\d]{3}\)?-?[\d]{3}-?[\d]{4}$|\d{10}$/;

    if (!name || !location || !date || !contactInfo) {
      displayError("All fields are required.");
      return;
    }

    let errors = [];

    if (!name || !nameRegex.test(name)) {
      errors.push("Please enter a valid name.");
    }

    if (!location) {
      errors.push("Please enter your desired event.");
    }

    if (!date) {
      errors.push("Please select a valid date of birth.");
    }

    if (!contactInfo || !contactInfoRegex.test(contactInfo)) {
      errors.push(
        "Please enter valid contact information (email or 10-digit phone number)."
      );
    }

    if (errors.length > 0) {
      displayMessage(errors.join("\n"), "error");
      return;
    }

    const attendee = {
      name,
      desiredEvent: location,
      dob: date,
      contactInfo,
    };

    console.log("Attendee data:", attendee);

    saveAttendeeData(attendee);
    console.log("Updated attendeeData after submission:", attendeeData);
    formMessage.textContent = "Registration successful!";
    formMessage.style.color = "green";
    form.reset();
  }

  form.addEventListener("submit", handleAttendeeSubmission);
});

function displayMessage(messages, type) {
  const messageElement = document.getElementById("errorContainer");

  if (type === "error") {
    messageElement.innerHTML = `
      <div class="error-box">
        <h3>ERROR</h3>
        <ul>
          ${messages
            .split("\n")
            .map((msg) => `<li>${msg}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  } else {
    messageElement.innerHTML = `<p class="success-message">${messages}</p>`;
  }
}
