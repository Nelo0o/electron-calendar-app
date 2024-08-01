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
        const dateFormat = event[0].date.split("/");
        const dateOK = new Date(Date.UTC(+dateFormat[2], parseInt(dateFormat[1]) - 1, +dateFormat[0])); 
        date.setAttribute('value', dateOK.toISOString().substring(0, 10));
    });
})()