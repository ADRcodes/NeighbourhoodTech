function saveWithExpiry(key, value, expiryTime) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function loadWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

document
  .getElementById("eventForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = document.querySelector(".submit-button");
    submitButton.disabled = true;
    submitButton.textContent = "Registering...";

    const name = document.getElementById("name").value.trim();
    const eventTitle = document.getElementById("event").value.trim();

    document.querySelectorAll(".error-message").forEach((msg) => msg.remove());

    if (!name || !eventTitle) {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "Please fill in all fields.";
      errorMessage.style.color = "red";
      document.getElementById("eventForm").appendChild(errorMessage);
      submitButton.disabled = false;
      submitButton.textContent = "Register For Event";
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!name.match(namePattern)) {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "Name should contain only letters.";
      errorMessage.style.color = "red";
      document.getElementById("eventForm").appendChild(errorMessage);
      submitButton.disabled = false;
      submitButton.textContent = "Register For Event";
      return;
    }

    if (eventTitle.length < 3) {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent =
        "Event title must be at least 3 characters long.";
      errorMessage.style.color = "red";
      document.getElementById("eventForm").appendChild(errorMessage);
      submitButton.disabled = false;
      submitButton.textContent = "Register For Event";
      return;
    }

    const registrations = loadWithExpiry("registrations") || [];

    const duplicate = registrations.some(
      (reg) => reg.name === name && reg.eventTitle === eventTitle
    );
    if (duplicate) {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "You have already registered for this event.";
      errorMessage.style.color = "red";
      document.getElementById("eventForm").appendChild(errorMessage);
      submitButton.disabled = false;
      submitButton.textContent = "Register For Event";
      return;
    }

    registrations.push({ name, eventTitle });
    saveWithExpiry("registrations", registrations, 3600000);

    displayRegistrations();

    setTimeout(() => {
      const successMessage = document.createElement("p");
      successMessage.textContent = `Thank you for registering, ${name}, for ${eventTitle}!`;
      successMessage.style.color = "green";
      document.getElementById("eventForm").appendChild(successMessage);

      document.getElementById("eventForm").reset();
      submitButton.disabled = false;
      submitButton.textContent = "Register For Event";

      setTimeout(() => successMessage.remove(), 5000);
    }, 1000);
  });

function displayRegistrations() {
  const registrations = loadWithExpiry("registrations") || [];
  const registrationList = document.getElementById("registration-list");
  registrationList.innerHTML = "";

  registrations.forEach((reg, index) => {
    const entry = document.createElement("p");
    entry.textContent = `${index + 1}. ${reg.name} registered for ${
      reg.eventTitle
    }`;
    registrationList.appendChild(entry);
  });
}

document.addEventListener("DOMContentLoaded", displayRegistrations);
