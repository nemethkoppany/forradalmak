
const vonal  = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(vonal);//Hozzárakjuk a body-hoz a vonalat
const formFields = [{//Egx tümb deklarálása, amiben 3 objektum lesz
    fieldid: "revolution",//Az első input id-ja
    fieldLabel: "forrdalom"//Az első input fölé ez lesz írva
},
{
    fieldid: "year",//A második input id-ja
    fieldLabel: "évszám"//Az második  input fölé ez lesz írva
},
{
    fieldid: "success",//A legördülő menü id-je
    fieldLabel: "sikeres"//A legördülő menü fölé ez lesz írva
}
];
const table = new Table("table");//Példányosítjuk az Table osztályt, azaz új objektumot hozunk létre egy table nevű class-al
const form = new Form("form");//Példányosítjuk az Form osztályt, azaz új objektumot hozunk létre egy table nevű class-al