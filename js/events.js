import { events } from "../info/eventsInfo.js";

const upcomingEvents = events.sort((a,b) => getDate(a.date) - getDate(b.date)).filter(x => getDate(x.date) >= getDate());
const pastEvents = events.sort((a,b) => getDate(b.date) - getDate(a.date)).filter(x => getDate(x.date) < getDate());

function formatDate(input) {
    const date = new Date(input);
    const formattedDate = date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formattedDate;
}

function getDate(input = "") {
    if (input === "") {
        return Math.floor(new Date().getTime() / 86400000) * 86400000;
    } else {
        return Math.floor(new Date(input).getTime() / 86400000) * 86400000;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Remove unused headings
    if (upcomingEvents.length < 1) {
        const eventHeading = document.getElementById("upcoming-events-heading");
        eventHeading.style = "display: none;"
    }
    if (pastEvents.length < 1) {
        const eventHeading = document.getElementById("past-events-heading");
        eventHeading.style = "display: none;"
    }

    // Create cards
    const cardTemplate = document.getElementById("event-template");
    const upcomingEventsContainer = document.getElementById("upcoming-events");
    const pastEventsContainer = document.getElementById("past-events");
    const upcomingEventsFragment = document.createDocumentFragment();
    const pastEventsFragment = document.createDocumentFragment();

    upcomingEvents.forEach((data) => {
        const newCard = cardTemplate.content.cloneNode(true);
        const templateDate = newCard.getElementById("event-date");
        const templateTitle = newCard.getElementById("event-title");
        const templateDescription = newCard.getElementById("event-description");
        const templateImage = newCard.getElementById("event-image");
        const templateLocation = newCard.getElementById("event-location");

        templateDate.innerText = formatDate(getDate(data.date));
        templateTitle.innerText = data.title;
        templateDescription.innerText = data.description;
        templateImage.src = "../images/events/" + data.imageFile;
        if (data.location !== "") {
            templateLocation.innerHTML = "<strong>Location:</strong> " + data.location;
        }
        upcomingEventsFragment.append(newCard);
    });

    upcomingEventsContainer.append(upcomingEventsFragment);

    pastEvents.forEach((data) => {
        const newCard = cardTemplate.content.cloneNode(true);
        const templateDate = newCard.getElementById("event-date");
        const templateTitle = newCard.getElementById("event-title");
        const templateDescription = newCard.getElementById("event-description");
        const templateImage = newCard.getElementById("event-image");
        const templateLocation = newCard.getElementById("event-location");

        templateDate.innerText = formatDate(getDate(data.date));
        templateTitle.innerText = data.title;
        templateDescription.innerText = data.description;
        templateImage.src = "../images/events/" + data.imageFile;
        if (data.location !== "") {
            templateLocation.innerHTML = "<strong>Location:</strong> " + data.location;
        }
        pastEventsFragment.append(newCard);
    });

    pastEventsContainer.append(pastEventsFragment);
});
