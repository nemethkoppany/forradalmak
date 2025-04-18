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
const manager = new Manager();//Példányosítjuk az Manager osztályt
const table = new Table("table", manager);//Példányosítjuk az Table osztályt
const form = new Form("form",formFields, manager);//Példányosítjuk az Form osztályt
const fileUploader = new FileUploaderAndDownloader("upload", manager);//Példányosítjuk az FileUploader osztályt
const filterForTheOOP = new Filter("filter", manager);//Példányosítjuk az Filter osztályt (átnevezve filterInstance-re)
