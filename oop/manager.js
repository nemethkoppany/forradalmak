class Manager{
    /**
     * @type {Array}
     */
    #tomb; //privát változó létrehozása

    #addForradalom_dataCallback; //privát változó létrehozása

    /**
     * @returns {Array}
     */
    constructor(){//Konstruktor létrehozása
        this.#tomb = [];//A privát változó értéke egy üres tömb
        
    }

    /**
     * 
     * @param {function} callback 
     */
    setaddForradalom_dataCallback(callback){//Egy setter létrehozása a privát változóhoz
        this.#addForradalom_dataCallback = callback;//A privát változó értéke a bemeneti paraméter

    }

    /**
     * 
     * @param {object} data 
     */
    addData(data){//Egy metódus létrehozása
        this.#tomb.push(data);//A privát tombhöz hozzáadunk egy új elemet
        this.#addForradalom_dataCallback(data);//A privát változó értékét meghívjuk
    }

   
}