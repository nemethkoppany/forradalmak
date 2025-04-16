
/**
 * 
 * @param {string} NameOfTheClass 
 * @returns {HTMLDivElement}
 */
const divMaker = (NameOfTheClass) => { // Arrow function egy bemeneti paraméterrel
    const div = document.createElement("div"); // div element létrehozása
    div.className = NameOfTheClass; // Ennek a div elementnek adunk egy className-et (Ezt a classname-et majd mi adjuk meg)
    return div; // Visszatérünk a divvel
}

/**
 * 
 * @param {Array<ForradalomData>} forradalomArray - A szűrendő objektumokat tartalmazó tömb. 
 * @param {(forradalom: ForradalomData): boolean} callback - A szűrési feltételeket meghatározó függvény. 
 * @returns {Array<ForradalomData>} - A szűrési feltételeknek megfelelő elemeket tartalmazó tömb. 
 */
const filter = (forradalomArray, callback) => { // Készítünk egy filter függvényt, ami egy tömböt és egy callback függvényt vár bemeneti paraméterként
    const filteredArray = []; // Készítünk egy üres tömböt, amibe a szűrt elemek kerülnek
    for (const forradalom of forradalomArray) { // Végigmegyünk a bemeneti tömbön
        if (callback(forradalom)) { // Ha a callback függvény visszatérési értéke igaz
            filteredArray.push(forradalom); // A szűrt tömbhöz hozzáadjuk az aktuális elemet
        }
    }
    return filteredArray; // Visszatérünk a szűrt tömbbel
}

/**
 * 
 * @param {HTMLDivElement} div 
 * @param {function(HTMLElement): void} callback{
    
 }} callback 
 */
const tableCreation = (div, callback) => { // Készítünk egy függvényt, ami létrehozza a táblázatot
    const divForTable = divMaker("tableDiv"); // Létrehozunk egy divet a táblázatnak
    div.appendChild(divForTable); // A divhez hozzáadjuk a táblázat divet
    const table = document.createElement("table"); // Létrehozunk egy táblázatot
    divForTable.appendChild(table); // A táblázathoz hozzáadjuk a táblázat divet
    const thead = document.createElement("thead"); // Létrehozunk egy thead elemet
    table.appendChild(thead); // A táblázathoz hozzáadjuk a thead elemet
    const tr = document.createElement("tr"); // Létrehozunk egy tr elemet
    thead.appendChild(tr); // A theadhez hozzáadjuk a tr elemet
    const th_cells = ["Forradalom", "Évszám", "Sikeres"]; // Létrehozunk egy tömböt, amiben a fejléc cellák nevei vannak
    for (const cell of th_cells) { // Végigmegyünk a fejléc cellák tömbjén
        const th = document.createElement("th"); // Létrehozunk egy th elemet
        th.innerText = cell; // A th elem szövege a cella neve
        tr.appendChild(th); // A tr-hez hozzáadjuk a th elemet
    }
    const tbody = document.createElement("tbody"); // Létrehozunk egy tbody elemet
    table.appendChild(tbody); // A táblázathoz hozzáadjuk a tbody elemet
    callback(tbody); // Meghívjuk a callback függvényt, aminek átadjuk a tbody-t
}


/**
 * 
 * @param {HTMLElement} tbody 
 * @param {HTMLDivElement} div 
 * @param {tomb[]} forradalomArray 
 */
const upload = (tbody, div, forradalomArray) => { // Készítünk egy függvényt, ami feltölti a táblázatot
    const input = document.createElement("input"); // Létrehozunk egy input elemet
    div.appendChild(input); // A divhez hozzáadjuk az input elemet
    input.type = "file"; // Az input típusa file
    input.id = "fileInput"; // Az input id-ja fileInput
    input.addEventListener("change", (e) => { // Hozzáadunk egy eseményfigyelőt az inputhoz, ami akkor fut le, ha megváltozik az értéke 
        const file = e.target.files[0]; // Az input fájlja az első fájl
        const reader = new FileReader(); // Létrehozunk egy FileReader objektumot
        reader.onload = () => { // Ha a fájl betöltődött
            const separatedFile = reader.result.split("\n"); // A fájl tartalmát sorokra bontjuk
            const noHeader = separatedFile.slice(1); // Az első sort eltávolítjuk (fejléc)
            for (const line of noHeader) { // Végigmegyünk a fájl sorain
                const sections = line.split(";"); // A sort pontosvessző mentén felbontjuk
                    const forradalom = {
                        revolution: sections[0].trim(), // A forradalom neve
                        year: sections[1].trim(), // Az évszám
                        success: sections[2].trim() // A sikeresség
                    };
                    forradalomArray.push(forradalom); // A forradalom objektumot hozzáadjuk a tömbhöz
                    addARowTOTheTable(tbody, forradalom); // Hozzáadunk egy sort a táblázathoz
            }
        };
        reader.readAsText(file); // Betöltjük a fájlt szövegként
    });
};

/**
 * 
 * @param {HTMLElement} tbody 
 * @param {HTMLDivElement} div 
 * @param {tomb[]} forradalomArray 
 */
const formCreation = (tbody, div, forradalomArray) => { // Készítünk egy függvényt, ami létrehozza a formot
    const divForForm = divMaker("formDiv"); // Létrehozunk egy divet a formnak
    div.appendChild(divForForm); // A divhez hozzáadjuk a form divet

    const form = document.createElement("form"); // Létrehozunk egy form elemet
    divForForm.appendChild(form); // A formhoz hozzáadjuk a form divet
    const formContentList = [{
        fieldid: "revolution", // A forradalom id-je
        fieldLabel: "Forradalom", // A forradalom neve
    },
    {
        fieldid: "year", // Az évszám id-je
        fieldLabel: "Évszám", // Az évszám neve
    },
    {
        fieldid: "success", // A sikeres id-je
        fieldLabel: "Sikeres",  // A sikeres neve
    }
];
    for(const fieldElement of formContentList) { // Végigmegyünk a form tartalmán
        const fieldDiv = divMaker("fieldDiv"); // Létrehozunk egy divet a mezőnek
        form.appendChild(fieldDiv); // A formhoz hozzáadjuk a mező divet
        const label = document.createElement("label"); // Létrehozunk egy label elemet
        label.innerText = fieldElement.fieldLabel; // A label szövege a mező neve
        label.htmlFor = fieldElement.fieldid; // A label htmlFor attribútuma a mező id-je
        fieldDiv.appendChild(label); // A mező divhez hozzáadjuk a label elemet

        fieldDiv.appendChild(document.createElement("br")); // A mező divhez hozzáadunk egy sortörést

        if(fieldElement.fieldid == "success") { // Ha a mező id-je sikeres
            const select = document.createElement("select"); // Létrehozunk egy select elemet
            select.id = fieldElement.fieldid; // A select id-ja a mező id-je

            const option1 = document.createElement("option"); // Létrehozunk egy option elemet
            option1.value = "igen"; // Az option értéke igen
            option1.innerText = "igen"; // Az option szövege igen

            const option2 = document.createElement("option"); // Létrehozunk egy option elemet
            option2.value = "nem"; // Az option értéke nem
            option2.innerText = "nem"; // Az option szövege nem

            select.appendChild(option1); // A selecthez hozzáadjuk az első option elemet
            select.appendChild(option2); // A selecthez hozzáadjuk a második option elemet
            fieldDiv.appendChild(select); // A mező divhez hozzáadjuk a select elemet
        }
        else{
            const input = document.createElement("input"); // Létrehozunk egy input elemet
            input.id = fieldElement.fieldid; // Az input id-ja a mező id-je 
            fieldDiv.appendChild(input); // A mező divhez hozzáadjuk az input elemet
            }

        fieldDiv.appendChild(document.createElement("br")); // A mező divhez hozzáadunk egy sortörést

        const errorSpan = document.createElement("span"); // Létrehozunk egy span elemet a hibaüzenetnek
        errorSpan.className = "error"; // A span className-je error
        fieldDiv.appendChild(errorSpan); // A mező divhez hozzáadjuk a span elemet
    }

    const submitButton = document.createElement("button"); // Létrehozunk egy gombot
    submitButton.innerText = "Hozzáadás"; // A gomb szövege Hozzáadás
    form.appendChild(submitButton); // A formhoz hozzáadjuk a gombot
    form.addEventListener("submit", (e) => { // Hozzáadunk egy eseményfigyelőt a formhoz, ami akkor fut le, ha elküldjük a formot
        e.preventDefault(); // Megakadályozzuk az alapértelmezett viselkedést (az oldal újratöltését)

        const objectForValues = {}; // Létrehozunk egy üres objektumot, amibe a mezők értékeit eltároljuk
        const inputs = e.target.querySelectorAll("input, select"); // Kiválasztjuk az összes input és select elemet a formban
        let isValid = true; // Létrehozunk egy változót, ami azt jelzi, hogy a mezők érvényesek-e
        for(const input of inputs) { // Végigmegyünk az inputokon
         const error = input.parentElement.querySelector(".error"); // Kiválasztjuk a hibaüzenet span elemet
         if(!error){ // Ha a hibaüzenet span elem nem létezik
            console.error("Nincs errorfield")
            return; // Visszatérünk
         }
         error.innerText = ""; // A hibaüzenet span elem szövege üres
         if(input.value === "") { // Ha az input értéke üres
            error.innerText = "Kötelező megadni!"; // A hibaüzenet span elem szövege Kötelező mező!
            isValid = false; // A mezők nem érvényesek
         }
         objectForValues[input.id] = input.value; // Az objektumba eltároljuk az input id-ját és értékét
        }
        if(isValid){ // Ha a mezők érvényesek
            forradalomArray.push(objectForValues); // A forradalom tömbhöz hozzáadjuk az objektumot
            addARowTOTheTable(tbody, objectForValues); // Hozzáadunk egy sort a táblázathoz
        }
    });
}
/**
 * 
 * @param {HTMLElement} tbody 
 * @param {forradalom} forradalom 
 */
const addARowTOTheTable = (tbody, forradalom) => { // Készítünk egy függvényt, ami hozzáad egy sort a táblázathoz
    const tr = document.createElement("tr"); // Létrehozunk egy tr elemet
    tbody.appendChild(tr); // A tbodyhoz hozzáadjuk a tr elemet

    const forradalomCell = document.createElement("td"); // Létrehozunk egy td elemet a forradalomnak
    forradalomCell.innerText = forradalom.revolution; // A td elem szövege a forradalom neve
    tr.appendChild(forradalomCell); // A tr-hez hozzáadjuk a forradalom cellát

    const evszamCell = document.createElement("td"); // Létrehozunk egy td elemet az évszámnak
    evszamCell.innerText = forradalom.year; // A td elem szövege az évszám
    tr.appendChild(evszamCell); // A tr-hez hozzáadjuk az évszám cellát

    const sikeresCell = document.createElement("td"); // Létrehozunk egy td elemet a sikeresnek
    sikeresCell.innerText = forradalom.success; // A td elem szövege a sikeresség
    tr.appendChild(sikeresCell); // A tr-hez hozzáadjuk a sikeres cellát
}

/**
 * 
 * @param {HTMLDivElement} div 
 * @param {{forradalom: string, evszam: Number, sikeres: string}[]} forradalomArray 
 */
const download = (div, forradalomArray) => { // Készítünk egy függvényt, ami letölti a táblázatot
    const button = document.createElement("button"); // Létrehozunk egy gombot
    button.innerText = "Letöltés"; // A gomb szövege Letöltés
    div.appendChild(button); // A divhez hozzáadjuk a gombot

    button.addEventListener("click", () => { // Hozzáadunk egy eseményfigyelőt a gombhoz, ami akkor fut le, ha rákattintunk
        const link = document.createElement("a"); // Létrehozunk egy link elemet
        const data = ["forradalom;évszám;sikeres"]; // Létrehozunk egy tömböt, amiben a fejléc van

        for(const forr of forradalomArray) { // Végigmegyünk a forradalom tömbön
            data.push(`${forr.revolution};${forr.year};${forr.success}`); // A tömbhöz hozzáadjuk az új sorokat
        }
        const innerText = data.join("\n"); // A tömböt egy stringgé alakítjuk
        const blob = new Blob([innerText]); // Létrehozunk egy Blob objektumot, amiben a szöveg van
        link.href = URL.createObjectURL(blob); // A link href attribútuma a Blob objektum URL-je
        link.download = "tovabbi_forradalom.csv"; // A link letöltési neve forradalom.csv
        link.click(); // A linkre kattintunk, hogy letöltsük a fájlt
        URL.revokeObjectURL(link.href); // A Blob objektum URL-jét visszavonjuk
    });
}


/**
 * 
 * @param {HTMLDivElement} div 
 * @param {HTMLElement} tbody 
 * @param {tomb[]} forradalomArray 
 */
const filterFormcreation = (div, tbody, forradalomArray) => { // Készítünk egy függvényt, ami létrehozza a szűrő formot
    const divForFilter = divMaker("filterDiv"); // Létrehozunk egy divet a szűrő formnak
    div.appendChild(divForFilter); // A divhez hozzáadjuk a szűrő form divet

    const filterForm = document.createElement("form"); // Létrehozunk egy form elemet
    divForFilter.appendChild(filterForm); // A szűrő formhoz hozzáadjuk a form elemet

    const select = document.createElement("select"); // Létrehozunk egy select elemet
    filterForm.appendChild(select); // A szűrő formhoz hozzáadjuk a select elemet

    const options = [
        {value: "", // Az üres érték a default érték
            innerText: "" // Az üres érték szövege is üres
        },
        {value: "revolution", //Az első érték a forradalom
            innerText: "Forradalom" // Az első érték szövege Forradalom
        }, 
        {value: "year", //A második érték az évszám
            innerText: "Évszám" // A második érték szövege Évszám
        }, 
        {value: "success", // A harmadik érték a sikeres
            innerText: "Sikeres" // A harmadik érték szövege Sikeres
        } 
    ]

    for(const option of options) { // Végigmegyünk a legördülő menü elemein
        const opt = document.createElement("option"); // Létrehozunk egy option elemet
        opt.value = option.value; // Az option értéke az option value-ja
        opt.innerText = option.innerText; // Az option szövege az option label-je
        select.appendChild(opt); // A selecthez hozzáadjuk az option elemet
    }

    const input = document.createElement("input"); // Létrehozunk egy input elemet
    input.id = "filterInput"; // Az input id-ja filterInput
    filterForm.appendChild(input); // A szűrő formhoz hozzáadjuk az input elemet

    const button = document.createElement("button"); // Létrehozunk egy gombot
    button.innerText = "Szűrés"; // A gomb szövege Szűrés
    filterForm.appendChild(button); // A szűrő formhoz hozzáadjuk a gombot

    filterForm.addEventListener("submit", (e) => { // Hozzáadunk egy eseményfigyelőt a szűrő formhoz, ami akkor fut le, ha elküldjük a formot   
        e.preventDefault(); // Megakadályozzuk az alapértelmezett viselkedést (az oldal újratöltését)

        let szamlalo = 0;// Létrehozunk egy számlálót, ami megszámolja a szűrési feltételeknek megfelelő elemeket
        for(const forradalom of forradalomArray){// Végigmegyünk a forradalom tömbön
            if(forradalom[select.value].toLowerCase().includes(input.value.toLowerCase())){ // Ha a forradalom tömb aktuális elemének a select értéke megegyezik az input értékével
                szamlalo++;// Növeljük a számlálót
            }
        }

        let  resultDiv = filterForm.querySelector(".result"); // Kiválasztjuk a szűrő formhoz tartozó result divet
        if(!resultDiv) { // Ha a result div nem létezik
            resultDiv = divMaker("result"); // Létrehozunk egy div elemet a szűrési eredménynek
            filterForm.appendChild(resultDiv); // A szűrő formhoz hozzáadjuk a div elemet
        }

        resultDiv.innerHTML = `A szűrés eredménye: ${szamlalo}`; // A result div szövege a szűrési eredmény
    });
}