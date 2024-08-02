(async () => {
    const idEvt = await window.electron.getEventId()
    
    const titre = document.getElementById('eventTitle') as HTMLInputElement
    const description = document.getElementById('eventDescription') as HTMLInputElement
    const date = document.getElementById('eventDatedeb') as HTMLInputElement
    const time = document.getElementById('eventTime') as HTMLInputElement
    const id = document.getElementById('eventId') as HTMLInputElement
    
    window.electron.getEventById(idEvt).then(event => {
    
            titre.setAttribute('value', event[0].titre);
            description.innerHTML= event[0].description;
            date.setAttribute('value', event[0].date_deb.slice(0, 10));
            time.setAttribute('value', event[0].date_deb.slice(11, 16));
            id.setAttribute('value', (event[0].id).toString())
            
        });

    const modifier = document.getElementById('valider');
    const supprimer = document.getElementById('supprimer');

    supprimer.addEventListener('click', async (event) => {
        event.preventDefault();
        const confirmed = await window.electron.showConfirmationDialog('Êtes-vous sûr de vouloir supprimer cet événement ?');
        if (confirmed) {
            window.electron.supprimeEvent(id.value);
        }
    })

    modifier.addEventListener('click', (event) => {
        event.preventDefault();
        const values = "description = '"+description.value+"', titre = '"+titre.value+"', date = '"+date.value+"', time = '"+time.value+"'"
        window.electron.modifieEvent(id.value, values)
    })
    
})()