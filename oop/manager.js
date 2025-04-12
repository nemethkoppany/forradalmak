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
     * @property {Array<{forradalom: string, evszam: number, sikeres: string}>} tomb
     */
    constructor(){//Konstruktor létrehozása
        this.#tomb = [];//A privát változó értéke egy üres tömb
        
    }

    /**
     * 
     * @param {setaddForradalom_dataCallback} callback 
     */
    setaddForradalom_dataCallback(callback){//Egy setter létrehozása a privát változóhoz
        this.#addForradalom_dataCallback = callback;//A privát változó értéke a bemeneti paraméter

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
}