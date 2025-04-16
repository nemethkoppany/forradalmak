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
                value: "forradalom", //A második option értéke
                innerText: "forradalom" //A második option szövege
            },
            {
                value: "evszam", //A harmadik option értéke
                innerText: "évszám" //A harmadik option szövege
            },
            {
                value: "sikeres", //A negyedik option értéke
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

       const button = this.buttonCreator("Szűrés");//Létrehozunk egy button elemet a buttonCreator függvénnyel
        form.appendChild(button);//Hozzáadjuk a button elemet a formhoz

        const div = document.createElement("div");//Létrehozunk egy div elemet
        form.appendChild(div);//Hozzáadjuk a div elemet a formhoz

      /**
       * 
       */
        form.addEventListener("submit", (e) => {//Csinálunk egy eseménykezelőt a filterForm submit eseményére
        e.preventDefault();//Megakadályozzuk az alapértelmezett viselkedést
            
            const counter = manager.counter(select.value, input.value);//A manager osztály counter metódusát hívjuk meg
            div.innerHTML = `A számlálás eredménye: ${counter}`; //A div belsejébe kiírjuk a számlálás eredményét
        });

        
    }
} 