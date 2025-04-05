class Area{//Készítünk egy Area osztályt

    #div;//Létrehozunk egy új privát változót

    /**
     * @returns {HTMLDivElement}
     */
    get div(){//Csinálunk neki egy gettert, hogy el tudjuk érni a változó
        return this.#div;//Visszatér a #div értékével
    }

    /**
     * 
     * @param {string} NameOfTheClass megadjuk a változó típusát
     */
    constructor(NameOfTheClass){//constructor létrehozása aminek van egy NameOfTheClass bemeneti paramétere
        let container = document.querySelector(".containeroop");//Eltároljuk egy változóban az első olyan elemet aminek van egy containeroop nevű class-a 
        if(!container){//Ha nincs ilyen elem
            container = document.createElement("div");//Készítünk egy div-et
            container.className = "containeroop";//És megadjuk neki ezt a class-t
            document.body.appendChild(container);//És hozzáappendeljük a body-hoz
        }
        this.#div = document.createElement("div");//Az új privát változóban eltároljuk a kreált div elemet
        this.#div.className = NameOfTheClass;//Ennek adunk majd egy class nevet
        container.appendChild(this.#div);//Hozzáadjuk a containerhez
    }
}
class Table extends Area{//Az Area osztály leszármazottja a Table osztály
    /**
     * 
     * @param {string} NameOfTheCssClass 
     */
    constructor(NameOfTheCssClass){//Konstruktor egy bemeneti paraméterrel
        super(NameOfTheCssClass);//Ezzel a bemeneti paraméterrel meghívjuk az Area osztály kontruktorát
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
        const tbody = document.createElement("body");//Készítünk egy HTML elemet
        table.appendChild(tbody);//Hozzáadjuk azt a table-höz
    }
}

class Form extends Area{//Az Area osztály leszármazottja a Form osztály
    /**
     * 
     * @param {string} NameOfTheClass 
     */
    constructor(NameOfTheClass){//Konstruktor egy bemeneti paraméterrel
        super(NameOfTheClass)//Ezzel a bemeneti paraméterrel meghívjuk az Area osztály kontruktorát


        const formOOP = document.createElement("form");//Készítünk egy formot
        this.div.appendChild(formOOP);//Ezt hozzérakjuk a az Area-ban létrehozott div-hez
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
            formOOP.appendChild(field);//Hozzárakjuk a form-hoz a field-et
        
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
        formOOP.appendChild(button);//És azt hozzárakjuk a fprm-hoz
    }

}