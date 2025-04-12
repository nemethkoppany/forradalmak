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

/**
 * 
 * @param {Array<ForradalomData>} forradalomArray - A szűrendő objektumokat tartalmazó tömb. 
 * @param {(forradalom: ForradalomData): boolean} callback - A szűrési feltételeket meghatározó függvény. 
 * @returns {Array<ForradalomData>} - A szűrési feltételeknek megfelelő elemeket tartalmazó tömb. 
 */
const filter = (forradalomArray, callback) => {//Készítünk egy filter függvényt, ami egy tömböt és egy callback függvényt vár bemeneti paraméterként
    const filteredArray = [];//Készítünk egy üres tömböt, amibe a szűrt elemek kerülnek
    for(const forradalom of forradalomArray){//Végigmegyünk a bemeneti tömbön
        if(callback(forradalom)){//Ha a callback függvény visszatérési értéke igaz
            filteredArray.push(forradalom);//A szűrt tömbhöz hozzáadjuk az aktuális elemet
        }
    }
    return filteredArray;//Visszatérünk a szűrt tömbbel
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
                const removeHeader = fileText.slice(1);//Az első elemet eltávolítjuk a tömbből
                for(const line of removeHeader){//Végigmegyünk a tömbön
                    const lineTrimmer_3000 = line.trim();//A sorokból levágjuk a spaceeket
                    const fields = lineTrimmer_3000.split(";");//A sorokat pontosvesszők mentén felbontjuk egy újabb tömbbe
                    const forradalom = {
                        revolution: fields[0],//Az első elem a forradalom
                        year: fields[1],//A második elem az évszám
                        success: fields[2]//A harmadik elem a sikeres
                    }
                    tomb.push(forradalom);//Hozzáadjuk a tomb-hoz az objektumot
                    const row = document.createElement("tr");//Készítünk egy tr-t
                    tbody.appendChild(row);//Hozzáadjuk a tbody-hoz 

                    const forradalomCell = document.createElement("td");//Készítünk egy td-t
                    forradalomCell.textContent = forradalom.revolution; //Az objektumunkból kiválasztjuk a forradalom mezőt (Ez lesz a cella tartalma)
                    row.appendChild(forradalomCell);//Hozzáadjuk a tr-hez a cellát

                    const evszamCell = document.createElement("td");//Készítünk egy td-t
                    evszamCell.textContent = forradalom.year; //Az objektumunkból kiválasztjuk az évszám mezőt (Ez lesz a cella tartalma)
                    row.appendChild(evszamCell);//Hozzáadjuk a tr-hez a cellát

                    const sikerCell = document.createElement("td");//Készítünk egy td-t
                    sikerCell.textContent = forradalom.success; //Az objektumunkból kiválasztjuk a siker mezőt (Ez lesz a cella tartalma)
                    row.appendChild(sikerCell);//Hozzáadjuk a tr-hez a cellát
                }
            };
            fileReader.readAsText(file_TheOnlyOne);//A fájlt szövegként olvassuk be
        });

        const downloadButton = document.createElement("button");//Készítünk egy gombot
        downloadButton.textContent = "Letöltés";//Amibe ez lesz írva
        containerDiv.appendChild(downloadButton);//És azt hozzárakjuk a div-hez
        downloadButton.addEventListener("click", () => {//Csinálunk egy eseménykezelőt a gombra
            const link = document.createElement("a");//Készítünk egy linket
            const arrayOfContents = ["forradalom;évszám;sikeres"];//Készítünk egy tömböt, amiben a fejléc van
            for(const forradalom of tomb){//Végigmegyünk a tomb-ön
                arrayOfContents.push(`${forradalom.revolution};${forradalom.year};${forradalom.success}`);//A tömbhöz hozzáadjuk az adatsorokat
            }
            const fileContent = arrayOfContents.join("\n");//A tömböt egy stringgé alakítjuk, ahol soronként elválasztjuk őket
            const blob = new Blob([fileContent]);//A stringet blobba rakjuk, hogy letölthető legyen
            link.href = URL.createObjectURL(blob);//Ideiglenes URL, hogy letölthető legyen a fájl
            link.download = "tovabbi_forradalmak.csv";//A letöltött fájl neve ez lesz
            link.click();//Rákattintunk a linkre, hogy letöltődjön
            URL.revokeObjectURL(link.href);//A blob URL-jét visszavonjuk
        });


        const divForFilterForm = divMaker("filterForm");//Készítünk egy divet, aminek a class-a filterForm lesz
        containerDiv.appendChild(divForFilterForm);//Hozzáadjuk a containerDiv-hez

        const filterForm = document.createElement("form");//Készítünk egy formot
        divForFilterForm.appendChild(filterForm);//Hozzáadjuk a filterForm-hoz
        const select = document.createElement("select");//Készítünk egy selectet
        filterForm.appendChild(select);//Hozzáadjuk a filterForm-hoz
        const options = [{
            value: "",//A legördülő menü első opciója
            innerText:""//Nincs szöveg
        },
        {
            value: "revolution",//A legördülő menü második opciója
            innerText:"forradalom"//A szövege forradalom
        },
        {
            value: "year", //A legördülő menü harmadik opciója
            innerText:"évszám"  //A szövege évszám
        },
        {
            value: "success", //A legördülő menü negyedik opciója
            innerText:"sikeres" //A szövege sikeres
        }];

        for(const option of options){//Végigmegyünk a tömbön
            const optionElement = document.createElement("option");//Készítünk egy opciót
            optionElement.value = option.value;//Az értéke az aktuális elem értéke lesz
            optionElement.innerText = option.innerText;//A szövege az aktuális elem szövege lesz
            select.appendChild(optionElement);//Hozzáadjuk a select-hez
        }

        const input = document.createElement("input");//Készítünk egy inputot
        input.id = "filterInput";//Az id-ja filterInput lesz
        filterForm.appendChild(input);//Hozzáadjuk a filterForm-hoz

        const Filterbutton = document.createElement("button");//Készítünk egy gombot
        Filterbutton.innerText = "Szűrés";//A gomb szövege ez lesz
        filterForm.appendChild(Filterbutton);//Hozzáadjuk a filterForm-hoz
        filterForm.addEventListener("submit", (e) => {//Csinálunk egy eseménykezelőt a filterForm submit eseményére
            e.preventDefault();//Megakadályozzuk az alapértelmezett viselkedést

            const filteringInput = e.target.querySelector("#filterInput");//Kiválasztjuk a filterInputot
            const selectFilter = e.target.querySelector("select");//Kiválasztjuk a selectet

            const arrayThatsFiltered = filter(tomb, (forradalom) => {//Készítünk egy szűrt tömböt, ami a filter függvény visszatérési értéke lesz
                if(selectFilter.value == "revolution"){//Ha a select értéke revolution
                    if(filteringInput.value === forradalom.revolution){//Ha a filterInput értéke megegyezik a forradalom értékével
                        return true;//Térjünk vissza igaz értékkel
                    }
                }
                else if(selectFilter.value == "year"){//Ha a select értéke year
                    if(filteringInput.value === forradalom.year){//Ha a filterInput értéke megegyezik az évszám értékével
                        return true;//Térjünk vissza igaz értékkel
                    }
                }
                else if(selectFilter.value == "success"){//Ha a select értéke success
                    if(filteringInput.value === forradalom.success){//Ha a filterInput értéke megegyezik a sikeres értékével
                        return true;//Térjünk vissza igaz értékkel
                    }
                }
                else{
                    return true;//Ha egyik sem, akkor is térjünk vissza igaz értékkel
                }
            });
            tbody.innerHTML = "";//A tbody tartalmát töröljük

            for(const forradalom of arrayThatsFiltered){//Végigmegyünk a szűrt tömbön
                const row = document.createElement("tr");//Készítünk egy tr-t
                tbody.appendChild(row);//Hozzáadjuk a tbody-hoz 

                const forradalomCell = document.createElement("td");//Készítünk egy td-t
                forradalomCell.textContent = forradalom.revolution; //Az objektumunkból kiválasztjuk a forradalom mezőt (Ez lesz a cella tartalma)
                row.appendChild(forradalomCell);//Hozzáadjuk a tr-hez a cellát

                const evszamCell = document.createElement("td");//Készítünk egy td-t
                evszamCell.textContent = forradalom.year; //Az objektumunkból kiválasztjuk az évszám mezőt (Ez lesz a cella tartalma)
                row.appendChild(evszamCell);//Hozzáadjuk a tr-hez a cellát

                const sikerCell = document.createElement("td");//Készítünk egy td-t
                sikerCell.textContent = forradalom.success; //Az objektumunkból kiválasztjuk a siker mezőt (Ez lesz a cella tartalma)
                row.appendChild(sikerCell);//Hozzáadjuk a tr-hez a cellát
            }
        });
