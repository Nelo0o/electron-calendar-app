import { IEvent } from "../../interfaces/IEvents";

(async () => {
    const lesEvents = await window.electron.getEventFromICS()

    let lesValeurs = "";
        const divEvenements = document.getElementById('lesevents');
        let contenuHTML = '';
    
        lesEvents.forEach((evenement: IEvent) => {
            contenuHTML += `
                <br>
                <h2>Titre : ${evenement.titre}</h2>
                <p>Descrition : ${evenement.description}</p>
                <p>Date de début : ${evenement.date_deb}</p>
                <p>Date de fin : ${evenement.date_fin}</p>
                <p>Lieu : ${evenement.location}</p>
                <br>
                <hr>
            `;

            if (lesValeurs == "") {
                lesValeurs += "('"+evenement.titre+"', '"+evenement.description+"', '"+evenement.date_deb+"', '"+evenement.date_fin+"', '"+evenement.location+"')";
            } else {
                lesValeurs += ", ('"+evenement.titre+"', '"+evenement.description+"', '"+evenement.date_deb+"', '"+evenement.date_fin+"', '"+evenement.location+"')";
            }
        });

        divEvenements.innerHTML = contenuHTML;

        const valider = document.getElementById('importer');

        valider.addEventListener('click', () => {
            window.electron.ajoutEvent('event',"titre, description, date_deb, date_fin, location", lesValeurs)
            
        })
    
})()

