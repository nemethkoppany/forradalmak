class ForradalomData{
    /**
     * @type {string}
     */
    #forradalom; //Ez egy privát változó

    /**
     * @type {Number}
     */
    #evszam; //Ez egy privát változó
    /**
     * @type {string}
     */
    #sikeres; //Ez egy privát változó


    /**
     *  @returns {string}
     */
    get forradalom(){//Ez egy getter, amivel elérjük a forradalom változót
        return this.#forradalom;//Visszatér a forradalom értékével
    }

    /**
     * @returns {Number}
     */
    get evszam(){//Ez egy getter, amivel elérjük az évszám változót
        return this.#evszam;//Visszatér az évszám értékével
    }

    /**
     * @returns {string}
     */
    get sikeres(){//Ez egy getter, amivel elérjük a sikeres változót
        return this.#sikeres;//Visszatér a sikeres értékével
    }

    /**
     * 
     * @param {string} forradalom 
     * @param {Number} evszam 
     * @param {string} sikeres
     */
    constructor(forradalom, evszam, sikeres){//Ez a konstruktor létrehozza az objektumot
        this.#forradalom = forradalom;//A forradalom értéke a bemeneti paraméter
        this.#evszam = evszam;//Az évszám értéke a bemeneti paraméter
        this.#sikeres = sikeres;//A sikeres értéke a bemeneti paraméter
    }
}