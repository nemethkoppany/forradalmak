const tomb = [];//Eltárolunk egy tömböt egy változóban
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

const tbody = document.createElement("tbody");//Készítünk egy HTMLelemet és azt eltároljuk egy változóban
tableElement.appendChild(tbody);//Hozzáadjuk a form-hoz

const fieldElements = [{//Egy tömb deklarálása, amiben 3 objektum lesz
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
        const input = document.createElement("select");//Hozzunk létre egy legördülő menüt
        input.id = fieldElement.fieldid;//Adjuk meg a select id-jét

        const option1 = document.createElement("option");//Első opció
        option1.value = "igen";//Az értéke nem
        option1.innerHTML = "igen";//Anmit kiír: igen

        const option2 = document.createElement("option");//Első opció
        option2.value = "nem";//Az értéke nen
        option2.innerHTML = "nem";//Anmit kiír: nem

        input.appendChild(option1);//Hozzárakjuk az opciót az inputhoz
        input.appendChild(option2);//Hozzárakjuk az opciót az inputhoz

        field.appendChild(document.createElement("br"));//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és a mező
        field.appendChild(input);//Ezt az egészet belerakjuk a field-be
    }
    else{//Ha még nem vagyunk a selectnél
        const input = document.createElement("input");//Csak input fieldet hozzunk létre
        input.id = fieldElement.fieldid;//Aminek ugyan az az id-je mint ami az objektumok tuéajdonságainak
        field.appendChild(document.createElement("br"));//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és legördülő menü
        field.appendChild(input);//Ezt az egészet belerakjuk a field-be
    }

    field.appendChild(document.createElement("br"));//Csinálunk egy brake-et is, hogy egymás alattt legyen a hibaüzenet és a beviteli mező
    const error = document.createElement("span");//Készítünk egy span-t, amibe belekerül majd a hibaüzenet
    error.className = "error";//Ennek a class-a error lesz
    field.appendChild(error);//Ezt hozzárakjuk a field-hez
    
}
const button = document.createElement("button");//Készítünk egy gombot
button.textContent = "Hozzáadás";//Amibe ez lesz írva
Simaform.appendChild(button);//És azt hozzárakjuk a fprm-hoz

/**
 * @param {object} e
 * @param {HTMLFormElement} form
 */
Simaform.addEventListener("submit", (e) => {//Csinálunk egy eseménykezelőt a form submit eseményére
    e.preventDefault();//Megakadályozzuk az alapétertelmezett lefutást

    const objectifyingUserResponse = {};//Készítünk egy üres objektumot, amibe belekerülnek a felhasználó által megadott értékek
    const fieldsOfInput = e.target.querySelectorAll("input, select");//Kiválasztjuk az összes inputot és selectet a formon belül
   
    let isValid = true;//Készítünk egy valid változót, ami alapértelmezetten igaz
    for(const inputofFields of fieldsOfInput){//Végigmegyünk az objektumon
        const error = inputofFields.parentElement.querySelector(".error");//Kiválasztjuk a szülő elemét és azon belül a hibát
        if(!error){//Ha nincs hiba elem
            console.error("Nem található error elem!");//Ha nem található error elem, akkor kiírjuk a konzolra
            return;//Kilépünk a függvényből
        }
        error.textContent = "";//A hibaüzenet szövege üres lesz
        if(inputofFields.value === ""){//Ha az input mező üres
            isValid = false;//A valid változó hamis lesz
            error.textContent = "Kötelező kitölteni!";//És kiírjuk a hibaüzenetet
        }
        objectifyingUserResponse[inputofFields.id] = inputofFields.value;//Az objektumba belekerül az input id-ja ami egyenlő lesz az input value-jával
    }
    if(isValid){//Ha az isValid változó igaz 

    tomb.push(objectifyingUserResponse); //Hozzáadjuk a tomb-hoz az objektumot

    const tr = document.createElement("tr");//Készítünk egy tr-t
    tbody.appendChild(tr);//Hozzáadjuk a tbody-hoz a tr-t

    const forradalomCell = document.createElement("td");//Készítünk egy td-t
    forradalomCell.textContent = objectifyingUserResponse.revolution; //Az objektumunkból kiválasztjuk a forradalom mezőt (Ez lesz a cella tartalma)
    tr.appendChild(forradalomCell);//Hozzáadjuk a tr-hez a cellát

    const evszamCell = document.createElement("td");//Készítünk egy td-t
    evszamCell.textContent = objectifyingUserResponse.year; //Az objektumunkból kiválasztjuk az évszám mezőt (Ez lesz a cella tartalma)
    tr.appendChild(evszamCell);//Hozzáadjuk a tr-hez a cellát

    const sikerCell = document.createElement("td");//Készítünk egy td-t
    sikerCell.textContent = objectifyingUserResponse.success; //Az objektumunkból kiválasztjuk a siker mezőt (Ez lesz a cella tartalma)
    tr.appendChild(sikerCell);//Hozzáadjuk a tr-hez a cellát

    }
});
containerDiv.appendChild(tableDiv);//Hozzárakjuk a containerdiv-hez a tableDiv-et
containerDiv.appendChild(formDiv);//Hozzárakjuk a containerDiv-hez a formDiv-et

const fileInputField = document.createElement("input");//Készítünk egy file inputot
    containerDiv.appendChild(fileInputField);//Hozzáadjuk a containerDiv-hez
    fileInputField.type = "file";//A file input típusa file lesz
    fileInputField.id = "fileInput";//Az id-ja fileInput lesz


    fileInputField.addEventListener("change", (e) => {//Csinálunk egy eseménykezelőt a file input változására
            const file_TheOnlyOne = e.target.files[0];//Kiválasztjuk az első fájlt
            const fileReader = new FileReader();//Készítünk egy FileReader-t
            fileReader.onload = () => {//Csinálunk egy eseménykezelőt a fájl betöltésére
                const fileText = fileReader.result.split('\n');//A fájl tartalmát egy tömbbe rakjuk, ahol a sorok külön elemek lesznek
                const removeHeader = fileText.slice(1);//Az első elemet eltávolítjuk a tömbből, mert az a fejléc
                for(const line of removeHeader){//Végigmegyünk a tömbön
                    const lineTrimmer_3000 = line.trim();//A sorokból levágjuk a spaceeket
                    const fields = lineTrimmer_3000.split(";");//A sorokat pontosvesszők mentén felbontjuk egy újabb tömbbe
                    const forradalom = {
                        forradalom: fields[0],//Az első elem a forradalom
                        evszam: fields[1],//A második elem az évszám
                        sikeres: fields[2]//A harmadik elem a sikeres
                    }

                    tomb.push(forradalom);//Hozzáadjuk a tomb-hoz az objektumot
                    const row = document.createElement("tr");//Készítünk egy tr-t
                    tbody.appendChild(row);//Hozzáadjuk a tbody-hoz 

                    const forradalomCell = document.createElement("td");//Készítünk egy td-t
                    forradalomCell.textContent = forradalom.forradalom; //Az objektumunkból kiválasztjuk a forradalom mezőt (Ez lesz a cella tartalma)
                    row.appendChild(forradalomCell);//Hozzáadjuk a tr-hez a cellát

                    const evszamCell = document.createElement("td");//Készítünk egy td-t
                    evszamCell.textContent = forradalom.evszam; //Az objektumunkból kiválasztjuk az évszám mezőt (Ez lesz a cella tartalma)
                    row.appendChild(evszamCell);//Hozzáadjuk a tr-hez a cellát

                    const sikerCell = document.createElement("td");//Készítünk egy td-t
                    sikerCell.textContent = forradalom.sikeres; //Az objektumunkból kiválasztjuk a siker mezőt (Ez lesz a cella tartalma)
                    row.appendChild(sikerCell);//Hozzáadjuk a tr-hez a cellát
                }
            };
            fileReader.readAsText(file_TheOnlyOne);//A fájlt szövegként olvassuk be

        });
