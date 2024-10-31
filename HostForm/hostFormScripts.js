// Event listener for handling form submission
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieval of inputs and trimming extra space

    const name = document.getElementById("name").value.trim();
    const organizer = document.getElementById("organizer").value.trim();
    const location = document.getElementById("location").value.trim();
    const date = document.getElementById("date").value;
    const cost = document.getElementById("cost").value;
    const contactInfo = document.getElementById("contactInfo").value.trim();
    const description = document.getElementById("description").value.trim();

    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    const organizerRegex = /^[a-zA-Z\s]+$/;
    const contactInfoRegex =
      /^[\w\.\-]+@[a-zA-Z0-9]+?\.[a-zA-Z]{2,3}$|^\(?[\d]{3}\)?-?[\d]{3}-?[\d]{4}$|\d{10}$/;

    let errors = [];

    if (!name || !nameRegex.test(name)) {
      errors.push("Please enter a valid event name.");
    }

    if (!organizer || !organizerRegex.test(organizer)) {
      errors.push("Please enter a valid organizer name (letters only).");
    }

    if (!location) {
      errors.push("Please enter the event location.");
    }

    if (!date) {
      errors.push("Please select a valid date.");
    }

    if (!cost || isNaN(cost) || cost < 0) {
      errors.push("Please enter a valid cost (positive number).");
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

    const formData = {
      name,
      organizer,
      location,
      date,
      cost,
      contactInfo,
      description: description || "No description provided",
    };

    handleFormSubmission(formData);
  });

function handleFormSubmission(data) {
  console.log("Form Data:", data);
  displayMessage("Registration successful!", "success");

  let events = JSON.parse(localStorage.getItem("events")) || [];

  events.unshift(data);

  localStorage.setItem("events", JSON.stringify(events));

  console.log(events);
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
  } else {
    messageElement.innerHTML = `<p class="success-message">${messages}</p>`;
  }
}
