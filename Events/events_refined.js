document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the array from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

    if (storedEvents.length > 0) {
        const dynamicEventsContainer = document.getElementById('dynamicEvents');

        //Gets each event//
        storedEvents.forEach(event => {
            const imagePath = event.image || "./eventpictures/digital_earth.jpg"; //Placeholder image gets added//

            if (dynamicEventsContainer) {
                const eventContentBox = document.createElement('div');
                eventContentBox.classList.add('eventcontentbox');
                
                //Adds content to the new div//
                eventContentBox.innerHTML = `
                    <div class="eventpicbox">
                        <img src="${imagePath}" alt="${event.title || 'Event Image'}" width="200px" height="200px">
                    </div>
                    <div class="eventtxtbox">
                        <h2>${event.name || 'Event Title'}</h2>
                        <p>Date: ${event.date || 'N/A'}</p>
                        <p>Location: ${event.location || 'N/A'}</p>
                        <br />
                        <a href="attend.html" target="_blank">
                            <button class="event_button">Register Now!</button>
                        </a>
                    </div>
                    <div class="eventdescbox">
                        <h2>Description</h2>
                        <p>${event.description || 'No description provided'}</p>
                    </div>
                `;

                // Appends //
                dynamicEventsContainer.appendChild(eventContentBox);
                console.log("Event Content Box Added to Container");
            } else {
                console.error("dynamicEvents container not found in the DOM.");
            }
        });
    } else {
        console.log("No events found in local storage."); //Logs if no events found
    }
});

//Clear local storage when testing//
/*localStorage.clear();*/

