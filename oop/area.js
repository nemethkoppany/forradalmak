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

    buttonCreator(label){ //Készítünk egy függvényt, ami létrehoz egy gombot
        const button = document.createElement("button");//Készítünk egy gombot
        button.textContent = label;//A gomb szövege a bemeneti paraméter lesz
        return button;//Visszatérünk a gombbal
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

        this.manager.setaddForradalom_dataCallback(this.#addForradalomCallback(tbody));//A managerhez hozzáadjuk a tableCallbackRenderer() metódust, ami a tbody-t várja bemeneti paraméternek
        this.manager.setaddForradalom_dataCallback(this.#tableCallbackRenderer(tbody));//A managerhez hozzáadjuk a tableCallbackRenderer() metódust, ami a tbody-t várja bemeneti paraméternek
        
    }

   
    #tableCallbackRenderer(bodyofTabel){ //Ez a metódus létrehozza a táblázatot
        
            return (tomb) => { //térjünk vissza egy függvénnyel, ami a bodyOfTable-t várja bemeneti paraméternek
            tbody.innerHTML = "";//A bodyOfTable belseje üres lesz
            console.log(tomb);//Kiírjuk a tomb értékét
            for(const data of tomb){//Végigmegyünk a tömbön
                this.#addRowToTable(tbody, data);//Hozzáadjuk a táblázathoz az aktuális elemet
            };//A managerhez hozzáadjuk a tableCallbackRenderer() metódust, ami a tbody-t várja bemeneti paraméternek
        };
        
    }

    #addForradalomCallback(bodyofTable){ //Ez a metódus létrehozása
        return (data) => {//térjünk vissza egy függvénnyel, ami a bodyOfTable-t várja bemeneti paraméternek
            this.#addRowToTable(bodyofTable, data);//Hozzáadjuk a táblázathoz az aktuális elemet
        }
    }

    /**
     * 
     * @param {HTMLElement} tbody 
     * @param {{forradalom: string, evszam: number, sikeres: string}} data - 
     */
      #addRowToTable(tbody, data){//Ez a metódus hozzáad egy új sort a táblázathoz
        const tr = document.createElement("tr");//Készítünk egy HTML elemet
        this.#createCellForTable(tr, data.revolution);//Az aktuális elem belekerül a cellába
        this.#createCellForTable(tr, data.year);//Az aktuális elem belekerül a cellába
        this.#createCellForTable(tr, data.success);//Az aktuális elem belekerül a cellába
        tbody.appendChild(tr);//Hozzáadjuk a tbody-hoz
    }

    #createCellForTable(row, innerText, type = "td"){//Ez a metódus létrehoz egy új cellát a táblázathoz
        const cell = document.createElement(type);//Készítünk egy HTML elemet
        cell.innerText = innerText;//Az aktuális elem belekerül a cellába
        row.appendChild(cell);//Hozzáadjuk a row-hoz
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
           this.#createCellForTable(headerRow, headerCellText, "th");//Hozzáadjuk a fejlécet a táblázathoz
        }
        const tbody = document.createElement("tbody");//Készítünk egy tbody-t
        table.appendChild(tbody);//Hozzáadjuk azt a table-höz
        return tbody;//Visszatérünk a tbody-val
    }
}

class Form extends Area { // Az Area osztály leszármazottja a Form osztály
    /**
     * @type {FieldOfFormClass[]}
     */
    #arrayOfFormField; // Privát változó

    /**
     * 
     * @param {string} NameOfTheClass 
     * @param {{fieldid: string, fieldLabel: string}[]} formFields
     * @param {Manager} manager
     */
    constructor(NameOfTheClass, formFields, manager) { // Konstruktor három bemeneti paraméterrel
        super(NameOfTheClass, manager); // Ezekkel a bemeneti paraméterekkel meghívjuk az Area osztály konstruktorát
        this.#arrayOfFormField = [];
        const formOOP = this.#createTheForm(formFields); // A formOOP változó értéke a #createTheForm metódus visszatérési értéke

        const button = document.createElement("button"); // Készítünk egy gombot
        button.textContent = "Hozzáadás"; // A gomb szövege
        formOOP.appendChild(button); // Hozzáadjuk a gombot a formhoz

        formOOP.addEventListener("submit", this.#eventListenerForTheForm()); // Hozzáadunk egy eseményfigyelőt a form submit eseményére
    }

    #createTheForm(List) { // Ez a metódus létrehozza a formot
        const formOOP = document.createElement("form"); // Készítünk egy formot
        this.div.appendChild(formOOP); // Hozzáadjuk a formot az Area által kreált div-hez

        for (const fieldElement of List) { // Végigmegyünk a tömbön
            const fieldOfForm = new FieldOfFormClass(fieldElement.fieldid, fieldElement.fieldLabel); // Készítünk egy új FieldOfFormClass objektumot
            this.#arrayOfFormField.push(fieldOfForm); // Hozzáadjuk a fieldOfForm-ot az arrayOfFormField tömbhöz
            formOOP.appendChild(fieldOfForm.getDiv()); // Hozzáadjuk a formhoz a fieldOfForm-ot
        }
        return formOOP; // Visszatérünk a formOOP változóval
    }

    #eventListenerForTheForm() {
        return (e) => { // Csinálunk egy eseménykezelőt a form submit eseményére
            e.preventDefault();
            console.log(this.#getValueObject());
            if (this.#validateFields()) { // Ha az isValid változó igaz
                const objectifyingUserResponse = this.#getValueObject(); // Készítünk egy új objektumot a felhasználó által megadott értékekkel
                const data = new ForradalomData(objectifyingUserResponse.revolution, objectifyingUserResponse.year, objectifyingUserResponse.success); // Készítünk egy új ForradalomData objektumot
                this.manager.addData(data); // Hozzáadjuk a managerhez az új ForradalomData objektumot
            }
        };
    }

    #validateFields() {
        let isValid = true; // Készítünk egy valid változót, aminek az értéke true
        for (const fieldOfForm of this.#arrayOfFormField) { // Végigmegyünk a tömbön
            fieldOfForm.error_element_value = ""; // A hibaüzenet szövege üres lesz
            if (fieldOfForm.input_element_value === "") { // Ha az input mező üres
                isValid = false; // A valid változó hamis lesz
                fieldOfForm.error_element_value = "Kötelező kitölteni!"; // És kiírjuk a hibaüzenetet
            }
        }
        return isValid; // Visszatérünk a valid változóval
    }

    #getValueObject() { // Ez a metódus létrehoz egy új objektumot a felhasználó által megadott értékekkel
        const objectifyingUserResponse = {}; // Készítünk egy üres objektumot
        for (const fieldOfForm of this.#arrayOfFormField) { // Végigmegyünk a tömbön
            objectifyingUserResponse[fieldOfForm.id] = fieldOfForm.value; // Az objektumba belekerül az input id-ja és értéke
        }
        return objectifyingUserResponse; // Visszatérünk az objektummal
    }
}

class FileUploaderAndDownloader extends Area{//Az Area osztály leszármazottja az Upload osztály
   /**
    * 
    * @param {string} NameOfTheClass 
    * @param {Manager} manager 
    */
    constructor(NameOfTheClass, manager){//Konstruktor két bemeneti paraméterrel
        super(NameOfTheClass, manager)//Ezekkel a bemeneti paraméterekkel meghívjuk az Area osztály kontruktorát

        const inputElement = document.createElement("input");//Készítünk egy input elemet
        inputElement.id = "fileinput";//Az id-ja file lesz
        inputElement.type = "file";//A típusa file lesz
        this.div.appendChild(inputElement);//Hozzáadjuk a div-hez
        inputElement.addEventListener("change", this.#eventListenerImport());//Hozzáadunk egy eseményfigyelőt az inputhoz
        const downloadButton = this.buttonCreator("Letöltés");//Készítünk egy gombot, aminek a szövege Letöltés lesz
        this.div.appendChild(downloadButton);//Hozzáadjuk a div-hez
        downloadButton.addEventListener("click", this.#downloadButtonEventListener());//Hozzáadunk egy eseményfigyelőt a gombhoz
    }

    #downloadButtonEventListener(){

       return () => {//Hozzáadunk egy eseményfigyelőt a gombhoz
            const link = document.createElement("a");//Készítünk egy linket
            const fileContent = this.manager.downloader9000();//meghívjük a letöltős függvényt
            const blob = new Blob([fileContent]);//Letölthető blob készítése
            link.href = URL.createObjectURL(blob);//Ideiglenes URL, hogy letölthető legyen a fájl
            link.download = "tovabbi_forradalom.csv";//A letöltendő fájl neve
            link.click();//A linkre kattintás
            URL.revokeObjectURL(link.href);//A link eltávolítása
        };
    }

    #eventListenerImport(){
       return (e) => {//Hozzáadunk egy eseményfigyelőt az inputhoz
            const file_TheOnlyOnes = e.target.files[0];//A file_TheOnlyOnes változó értéke az input fájl-ja
            const reader = new FileReader();//Készítünk egy új FileReader-t
            reader.onload = () =>{//Amikor betöltődött a fájl
                const fileText = reader.result.split('\n');//A fileText változó értéke a fájl tartalma, amit sorokra bontunk
                const removeHeader = fileText.slice(1);//Eltávolítjuk az első elemet
                for(const line of removeHeader){//Végigmegyünk a tömbön
                   const lineTrimmer_9000 = line.trim();//Eltávolítjuk a felesleges szóközöket
                   const splittedFields = lineTrimmer_9000.split(";");//A pontosvesszők mentén elválasztjuk az adatokat
    
                   const forradalomData = new ForradalomData(splittedFields[0], Number(splittedFields[1]), splittedFields[2]);//Készítünk egy új ForradalomData objektumot a fájl aktuális sorával
                   this.manager.addData(forradalomData);//Hozzáadjuk a managerhez az új ForradalomData objektumot
                }
               
            }
            reader.readAsText(file_TheOnlyOnes);//A reader beolvassa a fájlt 
        }
    }
    
}

class FieldOfFormClass{

    /**
     * @param {string} id
     */
    #id;//Privát változó
    
    /**
     * @param {HTMLInputElement} input_element
     */
    #input_element//Privát változó

    /**
     * @param {HTMLLabelElement} label_element  
     */
    #label_element//Privát változó

    /**
     * @param {HTMLSpanElement} error_element
     */
    #error_element//Privát változó

    /**
     * @returns {string}
     */
    get id(){//Csinálunk neki egy gettert, hogy el tudjuk érni a változó
        return this.#id;//Visszatér a #id értékével
    }

    /**
     * @returns {string}
    */
    get value(){
        return this.#input_element.value;
    }


    set error_element_value(value){//Csinálunk neki egy settert, hogy el tudjuk érni a változó
        this.#error_element.textContent = value;//Beállítjuk a #error_element értékét
    }
    
    /**
     * 
     * @param {string} id 
     * @param {string} label_value 
     */
    constructor(id, label_value){//Konstruktor két bemeneti paraméterrel
        this.#id = id;//Az id értéke a bemeneti paraméter lesz
        this.#label_element = document.createElement("label");//Készítünk egy labelt
        this.#label_element.htmlFor = id;//A label "id"-je (vagy inkább for-ja) az aktuális elem id-je lesz
        this.#label_element.textContent = label_value;//Ugyan így a textContent

        if(id === "success"){//Hogyha a fejlécnél elértünk a "sikeres" mezőhöz
            this.#input_element  = document.createElement("select");//Hozzunk létre egy legördülő menüt
            this.#input_element.id = id;//Adjuk meg a select id-jét
    
            const yesOption = document.createElement("option");//Első opció
            yesOption.value = "igen";//Az értéke yes
            yesOption.innerHTML = "igen";//Anmit kiír: igen
    
            const noOption = document.createElement("option");//Első opció
            noOption.value = "nem";//Az értéke no
            noOption.innerHTML = "nem";//Anmit kiír: nem
    
            this.#input_element.appendChild(yesOption);//Hozzárakjuk az opciót az inputhoz
            this.#input_element.appendChild(noOption);//Hozzárakjuk az opciót az inputhoz
        }
        else{//Ha még nem vagyunk a selectnél
            this.#input_element  = document.createElement("input");//Csak input fieldet hozzunk létre
            this.#input_element.id = id//Aminek ugyan az az id-je mint ami az objektumok tuéajdonságainak
           

        }
        this.#error_element = document.createElement("span");//Készítünk egy span-t, amibe belekerülnek a hibák
        this.#error_element.className = "error";//Ennek a class-a error lesz
    }    

    /**
     * 
     * @returns {HTMLDivElement}
     */
    getDiv(){
        const div = divMaker("field");//készítünk egy divet field class névvel
        const breakPoint1 = document.createElement("br");//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és a mező
        const breakPoint2 = document.createElement("br");//Csinálunk egy brake-et is, hogy egymás alattt legyen a szöveg és a mező
        const elementsOfHTML = [this.#label_element, breakPoint1, this.#input_element, breakPoint2, this.#error_element];//Készítünk egy tömböt amibe belekerülnek a HTML elemek
        for(const elementOFHTML  of elementsOfHTML){//Végigmegyünk a tömbön
            div.appendChild(elementOFHTML);//Hozzáadjuk a div-hez az aktuális elemet
        }
        return div;//Visszatérünk a div-el
    }
}

