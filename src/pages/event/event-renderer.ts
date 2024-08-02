(async () => {
    const idEvt = await window.electron.getEventId()
    
    const titre = document.getElementById('eventTitle') as HTMLInputElement
    const description = document.getElementById('eventDescription') as HTMLInputElement
    const date = document.getElementById('eventDate') as HTMLInputElement
    const time = document.getElementById('eventTime') as HTMLInputElement
    const id = document.getElementById('eventId') as HTMLInputElement
    
    window.electron.getEventById(idEvt).then(event => {
    
            titre.setAttribute('value', event[0].titre);
            description.innerHTML= event[0].description;
            date.setAttribute('value', event[0].date);
            time.setAttribute('value', event[0].time);
            id.setAttribute('value', (event[0].id).toString())
            
        });

    const modifier = document.getElementById('valider');
    const supprimer = document.getElementById('delete');

    supprimer.addEventListener('click', () => {
        window.electron.supprimeEvent(id.value)
    })

    modifier.addEventListener('click', () => {
        const values = "description = '"+description.value+"', titre = '"+titre.value+"', date = '"+date.value+"', time = '"+time.value+"'"
        window.electron.modifieEvent(id.value, values)
    })
    

})()



