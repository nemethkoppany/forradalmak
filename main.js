const makeDiv = (className) => {//Arrow function egy classname bemeneti paraméterrel
    const div = document.createElement("div");//div element létrehozása
    div.className = className;//Ennek a div elementnek adunk egy className-et (Ezt a classname-et majd mi adjuk meg)
    return div;//Visszatérünk a divvel
}

const containerDiv = makeDiv("container");//Készítünk egy div-et aminke a class-a container lesz
document.body.appendChild(containerDiv);//Hozzárakjuk a body-hoz a containerDiv-et
const tableDiv = document.createElement("table");//Készítünk egy table elementet

const formDiv = makeDiv("form");//Készítünk egy divet melynek a class-a form lesz

containerDiv.appendChild(tableDiv);//Hozzárakjuk a containerdiv-hez a tableDiv-et
containerDiv.appendChild(formDiv);//Hozzárakjuk a containerDiv-hez a formDiv-et