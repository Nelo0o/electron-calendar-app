import { IEvent } from "../../interfaces/IEvents";

console.log('ICS-RENDERER');

(async () => {
    const lesEvents = await window.electron.getEventFromICS()
    
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
        });
    
        divEvenements.innerHTML = contenuHTML;
    
})()

