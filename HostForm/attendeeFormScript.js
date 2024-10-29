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

    if (!name || !location || !date || !contactInfo) {
      displayError("All fields are required.");
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
