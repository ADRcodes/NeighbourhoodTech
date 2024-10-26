window.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded");
  const eventContainer = document.getElementById("eventContainer");

  const events = JSON.parse(localStorage.getItem("events")) || [];

  events.forEach((eventData) => addEventBlurb(eventData));
});

function addEventBlurb(eventData) {
  const eventContainer = document.getElementById("eventContainer");

  const blurb = document.createElement("div");
  blurb.classList.add("event-blurb");

  const image = document.createElement("img");
  image.src = "#";
  image.alt = "Event Image";
  image.classList.add("event-image");

  const details = document.createElement("div");
  details.classList.add("event-details");

  details.innerHTML = `
      <h4>${eventData.name}</h4>
      <p><strong>Organizer:</strong> ${eventData.organizer}</p>
      <p><strong>Date:</strong> ${eventData.date}</p>
      <p>${eventData.description}</p>
    `;

  blurb.appendChild(image);
  blurb.appendChild(details);

  eventContainer.appendChild(blurb);
}
