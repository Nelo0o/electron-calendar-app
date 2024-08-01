console.log("event renderer");

document.addEventListener('DOMContentLoaded', () => {
    const eventId = 10;
    window.modale.getEventById(eventId).then(event => {
        console.log(event);
        
    });
});

const titre = document.getElementById('eventTitle');
titre.setAttribute('value', 'HELLLO');