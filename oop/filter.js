class Filter extends Area{
    /**
     * 
     * @param {string} NameOfTheCssClass 
     * @param {Manager} manager 
     */
    constructor(NameOfTheCssClass, manager){
        super(NameOfTheCssClass, manager);//A szülő osztály konstruktorát hívjuk meg
        
        const form = document.createElement("form");//Létrehozunk egy form elemet
        this.div.appendChild(form);//A form elemet hozzáadjuk a divhez

        const select = document.createElement("select");//Létrehozunk egy select elemet
        form.appendChild(select);//A select elemet hozzáadjuk a formhoz

        const options = [ //Létrehozunk egy options tömböt
            {
                value: "", //Az első option értéke
                innerText: "" //Az első option szövege
            },
            {
                value: "revolution", //A második option értéke
                innerText: "forradalom" //A második option szövege
            },
            {
                value: "year", //A harmadik option értéke
                innerText: "évszám" //A harmadik option szövege
            },
            {
                value: "success", //A negyedik option értéke
                innerText: "sikeres" //A negyedik option szövege
            }
        ];

        for(const option of options){ //Végigmegyünk az options tömbön
            const opt = document.createElement("option");//Létrehozunk egy option elemet
            opt.value = option.value;//Beállítjuk az option értékét
            opt.innerText = option.innerText;//Beállítjuk az option szövegét
            select.appendChild(opt);//Hozzáadjuk az option elemet a selecthez
        }

        const input = document.createElement("input");//Létrehozunk egy input elemet
        input.id = "filterInput";//Beállítjuk az input id-ját
        form.appendChild(input);//Hozzáadjuk az input elemet a formhoz

        const button = document.createElement("button");//Létrehozunk egy button elemet
        button.innerText = "szűrés";//Beállítjuk a button szövegét
        form.appendChild(button);//Hozzáadjuk a button elemet a formhoz

        form.addEventListener("submit", (e) => { //Hozzáadunk egy eseményfigyelőt a formhoz
            e.preventDefault();//Megakadályozzuk az alapértelmezett eseményt

            const filterInput = e.target.querySelector("#filterInput");//Kiválasztjuk az input elemet
            const selectValue = e.target.querySelector("select").value;//Kiválasztjuk a select értékét

            this.manager.filterOOP((forradalom) => { //Hívjuk a filterOOP metódust
                if(selectValue === ""){//Ha a select értéke üres
                    return true;//Ha a select értéke üres, akkor true-t adunk vissza
                }
                return forradalom[selectValue] === filterInput.value;//Ellenőrizzük, hogy a forradalom értéke megegyezik-e az input értékével
            });
        });
    }
}