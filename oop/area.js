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
     * @type {FieldOfFormClass[]}
     */
    #arrayOfFormField;//Privát változó

    /**
     * 
     * @param {string} NameOfTheClass 
     * @param {{fieldid: string, fieldLabel: string}[]} formFields
     * @param {Manager} manager
     */
    constructor(NameOfTheClass,formFields, manager){//Konstruktor hátom bemeneti paraméterrel
        super(NameOfTheClass, manager)//Ezekkel a bemeneti paraméterekkel meghívjuk az Area osztály kontruktorát
        this.#arrayOfFormField = [];

        const formOOP = document.createElement("form");//Készítünk egy formot
        this.div.appendChild(formOOP);//Ezt hozzérakjuk a az Area-ban létrehozott div-hez
 
        
        for(const fieldElement of formFields){//Végigmegyünk a tömbön
          const fieldOfForm = new FieldOfFormClass(fieldElement.fieldid, fieldElement.fieldLabel);//Készítünk egy új FieldOfFormClass objektumot a tömb aktuális elemével
          this.#arrayOfFormField.push(fieldOfForm);//Hozzáadjuk a fieldOfForm-ot az arrayOfFormField tömbhöz
            formOOP.appendChild(fieldOfForm.getDiv());//Hozzáadjuk a formhoz a fieldOfForm-ot
        }
        const button = document.createElement("button");//Készítünk egy gombot
        button.textContent = "Hozzáadás";//Amibe ez lesz írva
        formOOP.appendChild(button);//És azt hozzárakjuk a fprm-hoz

        formOOP.addEventListener("submit", (e) => {//Hozzáadunk egy eseményfigyelőt a formhoz
            e.preventDefault();
            const objectifyingUserResponse = {};//Készítünk egy üres objektumot, amibe belekerülnek a felhasználó által megadott értékek

            let isValid = true;//Készítünk egy valid változót, aminek az értéke true
            for(const fieldOfForm of this.#arrayOfFormField){//Végigmegyünk a tömbön
                fieldOfForm.error_element_value = "";//A hibaüzenet szövege üres lesz
                if(fieldOfForm.input_element_value === ""){//Ha az input mező üres
                    isValid = false;//A valid változó hamis lesz
                    fieldOfForm.error_element_value = "Kötelező kitölteni!";//És kiírjuk a hibaüzenetet
                }
                objectifyingUserResponse[fieldOfForm.id] = fieldOfForm.input_element_value;//Az objektumba belekerül az input id-ja ami egyenlő lesz az fieldOFForm value-jával
            }
            if(isValid){//Ha az isValid változó igaz
                const data = new ForradalomData(objectifyingUserResponse.revolution, objectifyingUserResponse.year, objectifyingUserResponse.success);//Készítünk egy új ForradalomData objektumot a felhasználó által megadott értékekkel
                this.manager.addData(data);//Hozzáadjuk a managerhez az új ForradalomData objektumot
            }
         });
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
        inputElement.addEventListener("change", (e) => {//Hozzáadunk egy eseményfigyelőt az inputhoz
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
        });

        const downloadButton = document.createElement("button");//Készítünk egy gombot
        downloadButton.textContent = "Letöltés";//Amibe ez lesz írva
        this.div.appendChild(downloadButton);//És azt hozzárakjuk a div-hez
        downloadButton.addEventListener("click", () => {//Hozzáadunk egy eseményfigyelőt a gombhoz
            const link = document.createElement("a");//Készítünk egy linket
            const fileContent = this.manager.downloader9000();//meghívjük a letöltős függvényt
            const blob = new Blob([fileContent]);//Letölthető blob készítése
            link.href = URL.createObjectURL(blob);//Ideiglenes URL, hogy letölthető legyen a fájl
            link.download = "tovabbi_forradalom.csv";//A letöltendő fájl neve
            link.click();//A linkre kattintás
            URL.revokeObjectURL(link.href);//A link eltávolítása
        });

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
    get input_element_value(){//Csinálunk neki egy gettert, hogy el tudjuk érni a változó
        return this.#input_element.value;//Visszatér a #input_element értékével
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

