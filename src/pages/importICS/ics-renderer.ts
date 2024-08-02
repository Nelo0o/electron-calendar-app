console.log('ICS-RENDERER');

// const lesevents = lafonction

//for each lesevents blabla - Les events est un tableau d'objet

// Quentin : fait un append child pour chauqe objet + Au click du bouton execuyter fonction

const lesevents = [
    {
        titre: "titre1",
        description: "description1",
        date: "date1",
        time: "time1",
    },
    {
        titre: "titre2",
        description: "description2",
        date: "date2",
        time: "time2",
    },
]

function afficherEvenements() {
    const divEvenements = document.getElementById('lesevents');
    let contenuHTML = '';

    lesevents.forEach((evenement) => {
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
}

document.addEventListener('DOMContentLoaded', afficherEvenements);