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