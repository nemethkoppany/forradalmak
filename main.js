/**
 * 
 * @param {string} NameOfTheClass 
 * @returns {HTMLDivElement}
 */
const divMaker = (NameOfTheClass) => {//Arrow function egy bemeneti paraméterrel
    const div = document.createElement("div");//div element létrehozása
    div.className = NameOfTheClass;//Ennek a div elementnek adunk egy className-et (Ezt a classname-et majd mi adjuk meg)
    return div;//Visszatérünk a divvel
}

const containerDiv = divMaker("container");//Készítünk egy div-et aminke a class-a container lesz
document.body.appendChild(containerDiv);//Hozzárakjuk a body-hoz a containerDiv-et
const tableDiv = divMaker("table");//Készítünk egy table div-et

const tableElement = document.createElement("table");//Készítünk egy HTMLelemet és azt eltároljuk egy változóban
tableDiv.appendChild(tableElement);//Hozzáadjuk a tableDiv-hez

const header = document.createElement("thead");//Készítünk egy HTMLelemet és azt eltároljuk egy változóban
tableElement.appendChild(header);//Hozzáadjuk a tableElement-hez

const headerRow = document.createElement("tr");//Készítünk egy HTMLelemet és azt eltároljuk egy változóban
header.appendChild(headerRow);//Hozzáadjuk a header-höz

const headerText = ["forradalom", "évszám", "sikeres"];//Tömb amiben a fejléc tartalma van

for(const headerCellText of headerText){//Végigmegyünk ezen a tömbön
    const headerCell = document.createElement("th");//Készítünk egy HTMLelemet és azt eltároljuk egy változóban
    headerCell.innerText = headerCellText;//Az aktuális elem belekerül a cellába
    headerRow.appendChild(headerCell);//Hozzáadjuk a headerCell-t a headerRow-hoz
}

const formDiv = divMaker("form");//Készítünk egy divet melynek a class-a form lesz

const Simaform = document.createElement("form");//Készytünk egy formot
formDiv.appendChild(Simaform);//Ezt hozzérakjuk a formDiv-hez
const fieldElements = [{//Egx tümb deklarálása, amiben 3 objektum lesz
    fieldid: "revolution",//Az első input id-ja
    fieldLabel: "forrdalom"//Az első input fölé ez lesz írva
},
{
    fieldid: "year",//A második input id-ja
    fieldLabel: "évszám"//Az második  input fölé ez lesz írva
},
{
    fieldid: "success",//A legördülő menü id-je
    fieldLabel: "sikeres"//A legördülő menü fölé ez lesz írva
}
];

for(const fieldElement of fieldElements){//Végigmegyünk a tömbön
    const field = divMaker("field");//készítünk egy divet field class névvel
    Simaform.appendChild(field);//Hozzárakjuk a form-hoz a field-et

    const label = document.createElement("label");//Készítünk egy labelt
    label.htmlFor = fieldElement.fieldid;//A label "id"-je (vagy inkább for-ja) az aktuális elem id-je lesz
    label.innerHTML = fieldElement.fieldLabel;//Ugyan így a textContent
    field.appendChild(label);//És ezt hozzárakjuk a fieldhez


    if(fieldElement.fieldid === "success"){//Hogyha a fejlécnél elértünk a "sikeres" mezőhöz
        input = document.createElement("select");//Hozzunk létre egy legördülő menüt
        input.id = fieldElement.fieldid;//Adjuk meg a select id-jét

        const option1 = document.createElement("option");//Első opció
        option1.value = "yes";//Az értéke yes
        option1.innerHTML = "igen";//Anmit kiír: igen

        const option2 = document.createElement("option");//Első opció
        option2.value = "no";//Az értéke no
        option2.innerHTML = "nem";//Anmit kiír: nem

        input.appendChild(option1);//Hozzárakjuk az opciót az inputhoz
        input.appendChild(option2);//Hozzárakjuk az opciót az inputhoz

        field.appendChild(document.createElement("br"));//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és a mező
    }
    else{//Ha még nem vagyunk a selectnél
        input = document.createElement("input");//Csak input fieldet hozzunk létre
        input.id = fieldElement.fieldid;//Aminek ugyan az az id-je mint ami az objektumok tuéajdonságainak
        field.appendChild(document.createElement("br"));//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és legördülő menü
    }
    field.appendChild(input);//Ezt az egészet belerakjuk a field-be
}
const button = document.createElement("button");//Készítünk egy gombot
button.textContent = "Hozzáadás";//Amibe ez lesz írva
Simaform.appendChild(button);//És azt hozzárakjuk a fprm-hoz

containerDiv.appendChild(tableDiv);//Hozzárakjuk a containerdiv-hez a tableDiv-et
containerDiv.appendChild(formDiv);//Hozzárakjuk a containerDiv-hez a formDiv-et