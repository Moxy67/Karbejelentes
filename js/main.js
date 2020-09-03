let szoveg = "Sajnos Casco biztosítás nélkül nem fizet a biztosító ha te voltál a hibás!"
function sajnos() {
    var strong = document.createElement("strong");
    strong.innerHTML = (szoveg);
    valasztas = document.getElementById("tajekoztato");
    valasztas.appendChild(strong);
    document.getElementById("btns").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("info").style.display = "flex";
    document.getElementById("info-vissza").style.display = "flex";
    
    
    
    
}

let valasztas = 'Szükségem van néhány adatra!'
function biztositok() {
    
}
function valassz() {
    var strong = document.createElement("strong");
    strong.innerHTML = (valasztas);
    valasztas = document.getElementById("tajekoztato");
    valasztas.appendChild(strong);
    document.getElementById("btns").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("info").style.display = "flex";
    lista = document.getElementById("kerdesek");
    lista.style.visibility = "visible";
        
}

//Seect elem kitöltése
let biztositokLista = [
    "Aegon ",
    "Allianz ",
    "Avus",
    "Generali",
    "Genertel",
    "Groupama",
    "Köbe",
    "K&H",
    "MKB",
    "Posta",
    "Union",
    "Uniqa",
    "Signal",
    "Waberer",
    "Valami más"
];

let biztositokSelect = document.querySelector("#biztositokInput");
let index = 0;
while (index < biztositokLista.length) {
    let option = document.createElement("option");
    option.value = index;
    option.innerHTML = biztositokLista[index];
    biztositokSelect.appendChild(option);
    index++;

}

function vissza() {
    location.href = 'weboldal.html';
}

document.querySelector("#fooldal").addEventListener("click", vissza);

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

document.querySelector("#no").addEventListener("click", sajnos);
document.querySelector("#yes").addEventListener("click", valassz);

document.getElementById("help").onmouseover = function () { getAlert() };
function getAlert() {
    alert('A CASCO kötvényeden, a sárga csekken vagy a bank kivonatodon találod a biztosítód nevét!');

} 

document.getElementById("datumhelp").onmouseover = function () { dateAlert() };
function dateAlert() {
    alert('A baleseti bejellentő(kék-sárga)bal felső sarka 1. pont!');

} 

document.getElementById("tulajhelp").onmouseover = function () { ownerAlert() };
function ownerAlert() {
    alert('A kocsi törzskönyvében van. HA NINCS TÖRZSKÖNYV, mert a banknál van akkor a forgalmiban a C.1.1 és a C.1.2 sorokban levő név!');

}  
document.getElementById("tipushelp").onmouseover = function () { tipAlert() };
function tipAlert() {
    alert('A forgalmi engedély D.1 és D.3 sorában');

}  
