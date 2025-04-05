class Area{//Készítünk egy Area osztályt
    /**
     * 
     * @param {string} NameOfTheClass //Megadjuk a változó típusát
     */
    constructor(NameOfTheClass){//constructor létrehozása aminek van egy NameOfTheClass bemeneti paramétere
        let container = document.querySelector(".containeroop");//Eltároljuk egy változóban az első olyan elemet aminek van egy containeroop nevű class-a 
        if(!container){//Ha nincs ilyen elem
            container = document.createElement("div");//Készítünk egy div-et
            container.className = "containeroop";//És megadjuk neki ezt a class-t
            document.body.appendChild(container);//És hozzáappendeljük a body-hoz
        }
        const div = document.createElement("div");//Csinálunk egy div elementet
        div.className = NameOfTheClass;//Ennek adunk egy class-t (Majd később mi adjuk meg, hogy mi legyen)
        container.appendChild(div);//És hozzárakjuk a container-hez
    }
}