class Manager{
    /**
     * @type {Array<{forradalom: string, evszam: number, sikeres: string}>}
     */
    #tomb; //privát változó létrehozása

   /**
    * @type {addForradalom_dataCallback}
    */
    #addForradalom_dataCallback; //privát változó létrehozása

    /**
     * @type {{forradalom: string, evszam: number, sikeres: string}[]}
     */
    #tableRenderer; //privát változó létrehozása

    /**
     * @property {{forradalom: string, evszam: number, sikeres: string}[]} tomb
     */
    constructor(){//Konstruktor létrehozása
        this.#tomb = [];//A privát változó értéke egy üres tömb
        
    }

    /**
     * 
     * @param {function (ForradalomData):void} callback 
     */
    setaddForradalom_dataCallback(callback){//Egy setter létrehozása a privát változóhoz
        this.#addForradalom_dataCallback = callback;//A privát változó értéke a bemeneti paraméter

    }

    /**
     * 
     * @param {function} callback 
     */
    setTableRenderer(callback){//Egy setter létrehozása a privát változóhoz
        this.#tableRenderer = callback;//A privát változó értéke a bemeneti paraméter
    }

    /**
     * 
     * @param {function} callback
     */   

     
    filterOOP(callback){ //metódus létrehozása
        const array = [];
        for( const data of this.#tomb){//Végigmegyünk a privát tömbön
            if(callback(data)){//Ha a callback függvény igazat ad vissza
                array.push(data);//A tömbhöz hozzáadjuk az új elemet
            }
        }
        this.#tableRenderer(array);//A privát változó értékét meghívjuk
    }

    /**
     * 
     * @param {ForradalomData} data - A hozzáadandó forradalom adatai. 
     */
    addData(data){//Egy metódus létrehozása
        this.#tomb.push(data);//A privát tombhöz hozzáadunk egy új elemet
        this.#addForradalom_dataCallback(data);//A privát változó értékét meghívjuk
    }

    /**
     * 
     * @returns {string} 
     */
   downloader9000(){//Letöltéshez szükséges függvény
    const data = ["forradalom,évszám,sikeres"];//Egy tömb létrehozása, amiben a fejléc van
    for(const forradalom of this.#tomb){//Végigmegyünk a privát tömbön
        data.push(`${forradalom.forradalom};${forradalom.evszam};${forradalom.sikeres}`);//A tömbhöz hozzáadjuk az új sorokat
    }
    return data.join("\n");//Visszatérünk a tömbbel, amit egy stringgé alakítunk
   }

   /**
    * 
    * @param {"forradalom" | "evszam" | "sikeres" } forradalomProperty 
    * @param {string} fieldValue 
    * @returns {Number}
    */
   counter(forradalomProperty, fieldValue){ //Számláló függvény
        let counter = 0;//Változó létrehozása
        for(const forradalom of this.#tomb){//Végigmegyünk a privát tömbön
            if(forradalom[forradalomProperty].toLowerCase().includes(fieldValue.toLowerCase())){//Ha a forradalomProperty értéke megegyezik a fieldValue értékével
                counter++;//A változó értékét növeljük
            }
        }
        return counter;//Visszatérünk a változó értékével
   }
}