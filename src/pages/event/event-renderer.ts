console.log("event renderer");

const levent = window.electron.getEventsById(100);

console.log(levent)

const titre = document.getElementById('eventTitle');
titre.setAttribute('value', 'HELLLO') ;