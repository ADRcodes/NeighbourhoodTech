document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const skillLevel = document.getElementById("skillLevel").value;
    const position = document.getElementById("position").value;
    const team = document.getElementById("team").value.trim();

    if (!name || !age || !height || !skillLevel || !position) {
      displayMessage("Please fill in all required fields.", "error");
      return;
    }

    if (age < 16 || age > 60) {
      displayMessage("Age must be between 16 and 60.", "error");
      return;
    }

    if (height < 100 || height > 250) {
      displayMessage("Height must be between 100 cm and 250 cm.", "error");
      return;
    }

    if (skillLevel < 1 || skillLevel > 5) {
      displayMessage("Skill level must be between 1 and 5.", "error");
      return;
    }

    const formData = {
      name,
      age,
      height,
      skillLevel,
      position,
      team: team || "No preferred team",
    };

    handleFormSubmission(formData);
  });

function handleFormSubmission(data) {
  console.log("Form Data:", data);
  displayMessage("Registration successful!", "success");
}

function displayMessage(message, type) {
  const messageElement = document.getElementById("formMessage");
  messageElement.textContent = message;
  messageElement.className = type;
}
