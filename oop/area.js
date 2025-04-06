class Area{//Készítünk egy Area osztályt

    /**
     * 
     * @type {HTMLDivElement}
     */
    #div;//Létrehozunk egy új privát változót

    /**
     * @type {Manager}
     */
    #manager;//Létrehozunk egy új privát változót

    /**
     * @returns {HTMLDivElement}
     */
    get div(){//Csinálunk neki egy gettert, hogy el tudjuk érni a változó
        return this.#div;//Visszatér a #div értékével
    }

    /**
     * @returns {Manager}
     */
    get manager(){//Csinálunk neki egy gettert, hogy el tudjuk érni a változó
        return this.#manager;//Visszatér a #manager értékével
    }
    /**
     * 
     * @param {string} NameOfTheClass megadjuk a változó típusát
     * @param {Manager} manager megadjuk a manager típusát
     */
    constructor(NameOfTheClass,manager){//constructor létrehozása aminek van egy NameOfTheClass bemeneti paramétere
        this.#manager = manager;//A manager értéke a bemeneti paraméter lesz
        const container = this.#getContainer();//Egy változóba eltároljuk a #getContainer() metódus visszatérési értékét 
        this.#div = document.createElement("div");//Készítünk egy divet
        this.#div.className = NameOfTheClass;//Megadjuk a class nevét
        container.appendChild(this.#div);//Hozzáadjuk a containerhez
        if(!container){//Ha nincs ilyen elem
            container = document.createElement("div");//Készítünk egy div-et
            container.className = "containeroop";//És megadjuk neki ezt a class-t
            document.body.appendChild(container);//És hozzáappendeljük a body-hoz
        }
    }
    /**
     * 
     * @returns {HTMLDivElement}
     */
    #getContainer(){
        let containerDiv = document.querySelector(".containeroop");//Eltároljuk egy változóban az első olyan elemet aminek van egy containeroop nevű class-a
        if(!containerDiv){//Ha nincs ilyen elem
            containerDiv = document.createElement("div");//Készítünk egy div-et
            containerDiv.className = "containeroop";//És megadjuk neki ezt a class-t
            document.body.appendChild(containerDiv);//És hozzáappendeljük a body-hoz
        }
        return containerDiv;//Visszatérünk a containerDiv-el
    }
}
class Table extends Area{//Az Area osztály leszármazottja a Table osztály
    /**
     * 
     * @param {string} NameOfTheCssClass 
     * @param {Manager} manager
     */
    constructor(NameOfTheCssClass,manager){//Konstruktor két bemeneti paraméterrel
        super(NameOfTheCssClass, manager);//Ezekkel a bemeneti paraméterekkel meghívjuk az Area osztály kontruktorát
        const tbody = this.#createTable();//Egy változóba eltároljuk a createTable() metódus visszatérési értékét

        this.manager.setaddForradalom_dataCallback((data) => {//A manager osztályban beállítjuk a forradalom_dataCallback metódust
            const row = document.createElement("tr");//Készítünk egy tr-t
            tbody.appendChild(row);//Hozzáadjuk a tbody-hoz

            const forradalomCell = document.createElement("td");//Készítünk egy td-t
            forradalomCell.innerText = data.forradalom;//Az aktuális elem belekerül a cellába
            row.appendChild(forradalomCell);//Hozzáadjuk a row-hoz

            const evszamCell = document.createElement("td");//Készítünk egy td-t
            evszamCell.innerText = data.evszam;//Az aktuális elem belekerül a cellába
            row.appendChild(evszamCell);//Hozzáadjuk a row-hoz

            const sikeresCell = document.createElement("td");//Készítünk egy td-t
            sikeresCell.innerText = data.sikeres;//Az aktuális elem belekerül a cellába
            row.appendChild(sikeresCell);//Hozzáadjuk a row-hoz
        });
       
    }
    /**
     * 
     * @returns {HTMLTableSectionElement}
     */
    #createTable(){//Ez a metódus létrehozza a táblázatot
        const table = document.createElement("table");//Készítünk egy HTML elemet
        this.div.appendChild(table);//Azt hosszárakjuk az Area által kreált div-hez 

        const thead = document.createElement("thead");//Készítünk egy HTML elemet
        table.appendChild(thead);//Hozzáadjuk a table-höz

        const headerRow = document.createElement("tr");//Készítünk egy HTML elemet
        thead.appendChild(headerRow);//Hozzáadjuk a thead-hez

        const headerContent = ["forradalom", "évszám", "sikeres"];//Fejléc tartalma egy tömbben

        for(const headerCellText of headerContent){//Végigmegyünk ezen a tömbön
            const headerCell = document.createElement("th");//Készítünk egy HTML elemet
            headerCell.innerText = headerCellText;//Az aktuális elem belekerül a cellába
            headerRow.appendChild(headerCell);//Hozzáadjuk a headerRow-hoz
        }
        const tbody = document.createElement("tbody");//Készítünk egy tbody-t
        table.appendChild(tbody);//Hozzáadjuk azt a table-höz
        return tbody;//Visszatérünk a tbody-val
    }
}

class Form extends Area{//Az Area osztály leszármazottja a Form osztály
    /**
     * 
     * @param {string} NameOfTheClass 
     * @param {Array} formFields
     * @param {Manager} manager
     */
    constructor(NameOfTheClass,formFields, manager){//Konstruktor hátom bemeneti paraméterrel
        super(NameOfTheClass, manager)//Ezekkel a bemeneti paraméterekkel meghívjuk az Area osztály kontruktorát


        const formOOP = document.createElement("form");//Készítünk egy formot
        this.div.appendChild(formOOP);//Ezt hozzérakjuk a az Area-ban létrehozott div-hez
 
        
        for(const fieldElement of formFields){//Végigmegyünk a tömbön
            const field = divMaker("field");//készítünk egy divet field class névvel
            formOOP.appendChild(field);//Hozzárakjuk a form-hoz a field-et
        
            const label = document.createElement("label");//Készítünk egy labelt
            label.htmlFor = fieldElement.fieldid;//A label "id"-je (vagy inkább for-ja) az aktuális elem id-je lesz
            label.innerHTML = fieldElement.fieldLabel;//Ugyan így a textContent
            field.appendChild(label);//És ezt hozzárakjuk a fieldhez
        

        
            if(fieldElement.fieldid === "success"){//Hogyha a fejlécnél elértünk a "sikeres" mezőhöz
                const select = document.createElement("select");//Hozzunk létre egy legördülő menüt
                select.id = fieldElement.fieldid;//Adjuk meg a select id-jét
        
                const yesOption = document.createElement("option");//Első opció
                yesOption.value = "igen";//Az értéke yes
                yesOption.innerHTML = "igen";//Anmit kiír: igen
        
                const noOption = document.createElement("option");//Első opció
                noOption.value = "nem";//Az értéke no
                noOption.innerHTML = "nem";//Anmit kiír: nem
        
                select.appendChild(yesOption);//Hozzárakjuk az opciót az inputhoz
                select.appendChild(noOption);//Hozzárakjuk az opciót az inputhoz
        
                field.appendChild(document.createElement("br"));//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és a mező
                field.appendChild(select);//Ezt az egészet belerakjuk a field-be
            }
            else{//Ha még nem vagyunk a selectnél
                const input = document.createElement("input");//Csak input fieldet hozzunk létre
                input.id = fieldElement.fieldid;//Aminek ugyan az az id-je mint ami az objektumok tuéajdonságainak
                field.appendChild(document.createElement("br"));//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és legördülő menü
                field.appendChild(input);//Ezt az egészet belerakjuk a field-be
            }
            
        }
        const button = document.createElement("button");//Készítünk egy gombot
        button.textContent = "Hozzáadás";//Amibe ez lesz írva
        formOOP.appendChild(button);//És azt hozzárakjuk a fprm-hoz

        formOOP.addEventListener("submit", (e) => {//Hozzáadunk egy eseményfigyelőt a formhoz
            e.preventDefault();
            const objectifyingUserResponse = {};//Készítünk egy üres objektumot, amibe belekerülnek a felhasználó által megadott értékek

            const fieldsOfInput = e.target.querySelectorAll("input, select");//Kiválasztjuk az összes inputot és selectet a formon belül
            for(const fieldOfInput of fieldsOfInput){//Végigmegyünk a fieldsOfInput minden elemén
                objectifyingUserResponse[fieldOfInput.id] = fieldOfInput.value;//Az objektumunkba belekerülnek a felhasználó által megadott értékek, az id-jük alapján
            }

            const data = new ForradalomData(objectifyingUserResponse.revolution, objectifyingUserResponse.year, objectifyingUserResponse.success);//Készítünk egy új ForradalomData objektumot a felhasználó által megadott értékekkel
            this.manager.addData(data);//Hozzáadjuk a managerhez az új ForradalomData objektumot
        });
    }

}