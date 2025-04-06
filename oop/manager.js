class Manager{
    #tomb; //privát változó létrehozása
    #addForradalom_dataCallback; //privát változó létrehozása

    constructor(){//Konstruktor létrehozása
        this.#tomb = [];//A privát változó értéke egy üres tömb
    }

    setaddForradalom_dataCallback(callback){//Egy setter létrehozása a privát változóhoz
        this.#addForradalom_dataCallback = callback;//A privát változó értéke a bemeneti paraméter
    }

    addData(data){//Egy metódus létrehozása
        this.#tomb.push(data);//A privát tombhöz hozzáadunk egy új elemet
        this.#addForradalom_dataCallback(data);//A privát változó értékét meghívjuk
    }
}