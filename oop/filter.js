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


      
        form.addEventListener("submit", (e) => {//Csinálunk egy eseménykezelőt a filterForm submit eseményére
        e.preventDefault();//Megakadályozzuk az alapértelmezett viselkedést
            const filteringInput = e.target.querySelector("#filterInput");//Kiválasztjuk a filterInputot
                this.manager.filterOOP((forradalom) => {//Készítünk egy szűrt tömböt, ami a filter függvény visszatérési értéke lesz
                if(select.value == "revolution"){//Ha a select értéke revolution
                    return forradalom.forradalom.includes(filteringInput.value);//Ha a filterInput értéke benne van a forradalom értékében
                }
                else if(select.value == "year"){//Ha a select értéke year
                  return forradalom.evszam == filteringInput.value;//Ha a filterInput értéke benne van az évszám értékében
                }
                else if(select.value == "success"){//Ha a select értéke success
                    return forradalom.sikeres.includes(filteringInput.value);//Ha a filterInput értéke benne van a sikeres értékében

                }
                else{
                    return true;//Ha egyik sem, akkor is térjünk vissza igaz értékkels
                }
            });
        });
    }
} 