
let biztositoHelp = null;
let datumHelp = null;
let valasztasUtan = 'Szükségem van néhány adatra!';
let valaszEmailben = 'A szükséges dokumentumokat és információt megkapod az E-mail címedre.';

function valaszRendorNelkul() {
    // console.log("222");
    var biztositoHelp = 'A baleseti bejelentő(kék-sárga) 8.pontjában van egy sor \"Felelősségbiztosító:" ott a keresett adat! Nem azon a felén ahol a te adataid vannak!';
    var datumHelp = 'A baleseti bejellentő(kék-sárga)bal felső sarka 1. pont!';
    var strong = document.createElement("strong");
    strong.innerHTML = (valasztasUtan);
    valasztasUtan = document.getElementById("info");
    valasztasUtan.appendChild(strong);
    var help = document.getElementById("help");
    help.innerHTML = biztositoHelp
    var datumhelp = document.getElementById("datumhelp");
    datumhelp.innerHTML = datumHelp
    document.getElementById("btns").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("info").style.display = "block";
    lista = document.getElementById("lista");
    lista.style.visibility = "visible";
}

function valaszRendorrel() {
    var biztositoHelp = 'A rendőrségi igazoláson a másik fél adatainál a \"Kötv.sz" sorban találod!';
    datumHelp = 'A rendőrségi igazoláson \"Igazolás" alatti sorban van!';
    var strong = document.createElement("strong");
    strong.innerHTML = (valasztasUtan);
    valasztasUtan = document.getElementById("info");
    valasztasUtan.appendChild(strong);
    var help = document.getElementById("help");
    help.innerHTML = biztositoHelp
    var datumhelp = document.getElementById("datumhelp");
    datumhelp.innerHTML = datumHelp
    document.getElementById("btns").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("info").style.display = "block";
    lista = document.getElementById("lista");
    lista.style.visibility = "visible";  
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

let biztositokSelect = document.querySelector("#biztositok-input");
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

document.querySelector("#aMasikNo").addEventListener("click", valaszRendorNelkul );
document.querySelector("#aMasikYes").addEventListener("click", valaszRendorrel );

let tulajinfo = 'A kocsi törzskönyvében van. HA NINCS TÖRZSKÖNYV, mert a banknál van akkor a forgalmiban a C.1.1 és a C.1.2 sorokban levő név!';
let tulajhelp = document.getElementById("tulajhelp");
tulajhelp.innerHTML = tulajinfo;

let tipusinfo = 'A forgalmi engedély D.1 és D.3 sorában';
let tipushelp = document.getElementById("tipushelp");
tipushelp.innerHTML = tipusinfo;

// összeporszívózza az adatokat az inputokból
function getInputData(){
    var str = document.getElementById("gkInput").value;
    str = str.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    document.getElementById("gkInput").value = str;
    var inputs = document.querySelectorAll(".form-control");
    data = JSON.parse(window.localStorage.getItem("cart"));
    console.log(data,"111");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value < 20) {
            data[inputs[i].name] = biztositokLista[inputs[i].value];
            console.log(data,"222");
        } else{
            data[inputs[i].name] = inputs[i].value;
            console.log(data,"333");
        }
    }
    emailValasz();
    setTable(data);
    // console.log(data);
    // return data
}

function setTable(data){
    // console.log(typeof(data.szerepelt),data.szerepelt)
    if (data.szerepelt == "true"){
        setNewDataRow(data);
        // console.log(data.szerepelt,data.szerepelt = "true","true");
    }if (data.szerepelt == "false"){
        // console.log("false");
        setNewUser(data);
    }
}

function emailValasz(){
    var div = document.getElementById("emailInfo");/*,("class","row" ) );*/
    var strong = createAnyElement("strong");
    strong.innerHTML = valaszEmailben;
    div.appendChild(strong);
    document.body.appendChild(div);
    document.getElementById("info").style.display = "none";
    document.getElementById("kerdesek").style.display = "none";
    document.getElementById("emailInfo").style.display = "block";
    document.getElementById("info-vissza").style.display = "flex";
}

function dateTime() {
    date = document.getElementById("date");
    date.style.visibility = "visible";
}

document.querySelector("#biztositoOk").addEventListener("click", dateTime);

function tulajdonos() {
    tulaj = document.getElementById("tulaj");
    tulaj.style.visibility = "visible";
}

document.querySelector("#datumOk").addEventListener("click", tulajdonos);

function gk() {
    var str = document.getElementById("tulajInput").value;
    str = str.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    document.getElementById("tulajInput").value = str;
    gepkocsi = document.getElementById("gk");
    gepkocsi.style.visibility = "visible";
    elkuld = document.getElementById("elkuld");
    elkuld.style.visibility = "visible";
    
}

document.querySelector("#tulajOk").addEventListener("click", gk);

// Set data.
function setNewDataRow(data) {
    // let data = data;
    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/users/'+data.id, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err),
        ).then(
            data => 
            stratGetusers()
    );
}

function stratGetusers() {
    getserverData("http://localhost:3000/users").then(
        data => fillDataTable(data, "userTable")
    );    
}


// Fill table with server data.
function fillDataTable(data, tableId) {
    let table = document.querySelector('#'+tableId);
    if (!table) {
        console.error('Table'+tableId+'is not found');
        return;
    }
    //Add new user row to the table. 
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    let newRow = newUserRow();
    tBody.appendChild(newRow);

    for (let row of data) {
        let tr = createAnyElement("tr");
        for(let k of keys) {
            let td = createAnyElement("td");
            let input = createAnyElement("input",{
                class: "form-control",
                value: row[k],
                name: k
            });    
            if (k == "id") {
                input.setAttribute("readonly", true); 
            }
            td.appendChild(input);  
            tr.appendChild(td);
        }               
        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        tBody.appendChild(tr);
    }
}
/* var cart = JSON.parse(window.localStorage.getItem("cart"));
console.log(cart,"999"); */

function setNewUser(data) {
    // let data = bejelentkezes;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };     

    fetch('http://localhost:3000/users', fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => stratGetusers()
    ); 
}

datePickerId.max = new Date().toISOString().split("T")[0];
