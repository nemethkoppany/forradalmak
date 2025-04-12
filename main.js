const tomb = []; // Eltárolunk egy tömböt egy változóban


const containerDiv = divMaker("containerDiv"); // Létrehozunk egy divet a táblázatnak
document.body.appendChild(containerDiv); // A bodyhoz hozzáadjuk a táblázat divet
tableCreation(containerDiv, (tbody) => { // Meghívjuk a tableCreation függvényt, aminek átadjuk a divet és egy callback függvényt
    formCreation(tbody, containerDiv, tomb); // Meghívjuk a formCreation függvényt, aminek átadjuk a tbody-t, a divet és a forradalom tömböt
    upload(tbody, containerDiv, tomb); // Meghívjuk az upload függvényt, aminek átadjuk a tbody-t, a divet és a forradalom tömböt
    download(containerDiv, tomb); // Meghívjuk a download függvényt, aminek átadjuk a divet és a forradalom tömböt
    filterFormcreation(containerDiv, tbody, tomb); // Meghívjuk a filterFormcreation függvényt, aminek átadjuk a divet, a tbody-t és a forradalom tömböt
});