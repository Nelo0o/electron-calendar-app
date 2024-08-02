(async () => {
    const idEvt = await window.electron.getEventId()

    console.log(idEvt);
    
    const titre = document.getElementById('eventTitle');
    const description = document.getElementById('eventDescription');
    const date = document.getElementById('eventDate');
    
    window.electron.getEventById(idEvt).then(event => {
        console.log(event[0]);
    
            titre.setAttribute('value', event[0].titre);
            description.innerHTML= event[0].description;
            date.setAttribute('value', event[0].date);
            
        });
})()

