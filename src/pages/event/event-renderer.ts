console.log("event renderer");

const titre = document.getElementById('eventTitle');
const description = document.getElementById('eventDescription');
const date = document.getElementById('eventDate');

document.addEventListener('DOMContentLoaded', () => {
    const levent = window.modale.getEventById(10).then(event => {
        console.log(event[0]);

        titre.setAttribute('value', event[0].titre);
        description.innerHTML= event[0].description;
        let dateFormat = event[0].date;
        dateFormat = dateFormat.split("/");
        dateFormat = new Date(+dateFormat[2], dateFormat[1] - 1, +dateFormat[0]); 
        date.setAttribute('value', dateFormat.toISOString().substring(0, 10));
        
    });
});


