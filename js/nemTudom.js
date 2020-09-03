let valasztas = 'Szükségem van néhány adatra!';
let felelet = null;
let felelet2 = null;

function valaszRandorNelkul() {
    var strong = document.createElement("strong");
    strong.innerHTML = (valasztas);
    valasztas = document.getElementById("tajekoztato");
    valasztas.appendChild(strong);
    document.getElementById("btns").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("info").style.display = "flex";
    lista = document.getElementById("kerdesek");
    lista.style.visibility = "visible";
    felelet = 'A baleseti bejelentő(kék-sárga) 8.pontjában van egy sor \"Felelősségbiztosító:" ott a keresett adat! Nem azon a felén ahol a te adataid vannak!';
    felelet2 = 'A baleseti bejellentő(kék-sárga)bal felső sarka 1. pont!';
    
}


function valaszRendorrel() {
    var strong = document.createElement("strong");
    strong.innerHTML = (valasztas);
    valasztas = document.getElementById("tajekoztato");
    valasztas.appendChild(strong);
    document.getElementById("btns").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("info").style.display = "flex";
    lista = document.getElementById("kerdesek");
    lista.style.visibility = "visible";
    felelet = 'A rendőrségi igazoláson a másik fél adatainál a \"Kötv.sz" sorban találod!';
    felelet2 = 'A rendőrségi igazolás \"Igazolás" alatti sorban van!';
   
}

//Seect elem kitöltése
let biztositokLista = [
    "Nem volt biztosítása",
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


document.querySelector("#no").addEventListener("click", valaszRandorNelkul);
document.querySelector("#yes").addEventListener("click", valaszRendorrel);

document.getElementById("help").onmouseover = function () { getAlert() };
function getAlert() {
    alert(felelet);

} 

document.getElementById("datumhelp").onmouseover = function () { dateAlert() };
function dateAlert() {
    alert(felelet2);

}  
document.getElementById("tulajhelp").onmouseover = function () { ownerAlert() };
function ownerAlert() {
    alert('A kocsi törzskönyvében van. HA NINCS TÖRZSKÖNYV, mert a banknál van akkor a forgalmiban a C.1.1 és a C.1.2 sorokban levő név!');

}  
document.getElementById("tipushelp").onmouseover = function () { tipAlert() };
function tipAlert() {
    alert('A forgalmi engedély D.1 és D.3 sorában');

} 