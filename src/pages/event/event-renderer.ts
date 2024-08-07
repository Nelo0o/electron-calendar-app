(async () => {
    const idEvt = await window.electron.getEventId()
    

    
    window.electron.getEventById(idEvt).then(event => {
    
            titre.setAttribute('value', event[0].titre);
            description.innerHTML= event[0].description;
            date.setAttribute('value', event[0].date_deb.slice(0, 10));
            time.setAttribute('value', event[0].date_deb.slice(11, 16));
            id.setAttribute('value', (event[0].id).toString())
            dateFin.setAttribute('value', event[0].date_fin.slice(0, 10));
            timeFin.setAttribute('value', event[0].date_fin.slice(11, 16));
            lieu.innerHTML = event[0].location;
            categorie.setAttribute('value', event[0].categorie);
            statut.setAttribute('value', event[0].statut);
            nbMaj.setAttribute('value', event[0].nbMaj.toString());
        });
    
})()

const titre = document.getElementById('eventTitle') as HTMLInputElement
const description = document.getElementById('eventDescription') as HTMLInputElement
const date = document.getElementById('eventDatedeb') as HTMLInputElement
const time = document.getElementById('eventTime') as HTMLInputElement
const id = document.getElementById('eventId') as HTMLInputElement
const dateFin = document.getElementById('eventDatefin') as HTMLInputElement
const timeFin = document.getElementById('eventTimefin') as HTMLInputElement
const lieu = document.getElementById('eventLieu') as HTMLInputElement
const categorie = document.getElementById('eventcategorie') as HTMLInputElement
const statut = document.getElementById('eventStatus') as HTMLInputElement
const nbMaj = document.getElementById('eventnbmaj') as HTMLInputElement

const valider = document.getElementById('valider');
const supprimer = document.getElementById('supprimer');

supprimer.addEventListener('click', async (event) => {
    event.preventDefault();
    const confirmed = await window.electron.showConfirmationDialog('Êtes-vous sûr de vouloir supprimer cet événement ?');
    if (confirmed) {
        window.electron.supprimeEvent(id.value);
    }
})

valider.addEventListener('click', (event) => {
    event.preventDefault();
    const values = "description = '"+description.value+"', titre = '"+titre.value+"', date_deb = '"+date.value+" "+time.value+":00"+"', date_fin = '"+dateFin.value+" "+timeFin.value+":00"+"', location = '"+lieu.value+"', categorie = '"+categorie.value+"', statut = '"+statut.value+"', nbMaj= "+((parseInt(nbMaj.value)+1))+"";
    const valuesAjout = "('"+description.value+"', '"+titre.value+"', '"+date.value+" "+time.value+":00"+"', '"+dateFin.value+" "+timeFin.value+":00"+"', '"+lieu.value+"', '"+categorie.value+"', '"+statut.value+"', 1)";
    console.log(values);
    
    if (id.value.length > 0) {
        window.electron.modifieEvent(id.value, values);
    } else {
        window.electron.ajoutEvent('event', "description, titre, date_deb, date_fin, location, categorie, statut, nbMaj", valuesAjout );
    }

})