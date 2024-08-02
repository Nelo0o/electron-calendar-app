import { IEvent } from "../../interfaces/IEvents";

console.log('ICS-RENDERER');

(async () => {
    const lesEvents = await window.electron.getEventFromICS()

    let lesValeurs = "";
        const divEvenements = document.getElementById('lesevents');
        let contenuHTML = '';
    
        lesEvents.forEach((evenement: IEvent) => {
            contenuHTML += `
                <br>
                <h2>${evenement.titre}</h2>
                <p>${evenement.description}</p>
                <p>Date : ${evenement.date}</p>
                <p>Heure : ${evenement.time}</p>
                <br>
                <hr>
            `;

            if (lesValeurs == "") {
                lesValeurs += "('"+evenement.titre+"', '"+evenement.description+"', '"+evenement.date+"', '"+evenement.time+"')";
            } else {
                lesValeurs += ", ('"+evenement.titre+"', '"+evenement.description+"', '"+evenement.date+"', '"+evenement.time+"')";
            }
        });

        divEvenements.innerHTML = contenuHTML;

        const valider = document.getElementById('importer');

        valider.addEventListener('click', () => {
            window.electron.ajoutEvent('evenements',"titre, description, date, time", lesValeurs)
            
        })
    
})()

