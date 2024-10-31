document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const location = document.getElementById("location").value.trim();
    const date = document.getElementById("date").value;
    const contactInfo = document.getElementById("contactInfo").value.trim();

    const contactInfoRegex =
      /^[\w\.\-]+@[a-zA-Z0-9]+?\.[a-zA-Z]{2,3}$|^\(?[\d]{3}\)?-?[\d]{3}-?[\d]{4}$|\d{10}$/;

    let errors = [];

    if (!name) errors.push("Please enter your name.");
    if (!location) errors.push("Please enter your location.");
    if (!date) errors.push("Please enter a valid date.");
    if (!contactInfo || !contactInfoRegex.test(contactInfo)) {
      errors.push(
        "Please enter valid contact information (email or 10-digit phone number)."
      );
    }

    if (errors.length > 0) {
      displayMessage(errors.join("\n"), "error");
      return;
    }

    const formData = { name, location, date, contactInfo };
    handleFormSubmission(formData);
  });

function handleFormSubmission(data) {
  console.log("Attendee Data:", data);
  displayMessage("Registration successful!", "success");

  let attendees = JSON.parse(localStorage.getItem("attendees")) || [];
  attendees.unshift(data);
  localStorage.setItem("attendees", JSON.stringify(attendees));

  console.log("Updated attendee data:", attendees);
}

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
    messageElement.style.color = "red";
  } else {
    messageElement.innerHTML = `<p class="success-message">${messages}</p>`;
    messageElement.style.color = "green";
  }
}
