

let emailInfo = 'Olyan E-mail címet adj meg amit használsz, mert ide fogod kapni az információkat!';
let emailHelp = document.getElementById("emailHelp");
emailHelp.innerHTML = emailInfo;

let rendszamInfo = 'Az a rendszám kell amit beakarsz jelenteni!';
let rendszamHelp = document.getElementById("rendszamHelp");
rendszamHelp.innerHTML = rendszamInfo;

let rendszamInfoHelp = 'A Rendszámnak így kell kinézni! Pl: XYZ678 Csak betűk és számok semmi más karakter. ';
let rendszamInputHelp = document.getElementById("rendszamInputHelp");
rendszamInputHelp.innerHTML = rendszamInfoHelp;

let bejelentkezes = {};

// összeporszívózza az adatokat az inputokból
function getLoginInputData(){
    var inputs = document.querySelectorAll(".form-control");
    adat = {};
    for (let i = 0; i < inputs.length; i++) {
        adat[inputs[i].name] = inputs[i].value;     
    }
    // tovabbWeboldalra();
    return adat
}

function getserverData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };    
    return fetch(url,fetchOptions).then(
        response => response.json(),
        err => console.error(err) 
    );  
}    



document.querySelector("#getDataBtn").addEventListener("click", emailCheck);

function emailCheck() {
    var input = document.getElementById("emailInput").value;
    if (input.trim() == '') {
        alert("Kérlek töltsd ki az e-mail mezőt");       
    }
    rendszamCheck();
}

function rendszamCheck() {
    var input = document.getElementById("rendszamInput").value;
    if (input.trim() == '') {
        alert( "Kérlek töltsd ki a rendszám mezőt");
    } else {
        rendszamDarabCheck();
    } 
}

function rendszamDarabCheck(){
    var szamok = 0;
    var betuk = 0;
    for (var i = 0; i < rendszamInput.value.length; i++) {
        if (rendszamInput.value[i]>=0){
            szamok += 1;
        }else{
            betuk += 1;
        } 
    }
    
    if (szamok>4){
        alert("A rendszámban nem lehet több 4 számnál!")
    } 
    if (betuk>4){
        alert("A rendszámban nem lehet több 4 betűnél!")
    }
    
    if ((szamok+betuk)>8 || (szamok+betuk)<1){
        alert("Biztos ez a jó rendszám?")
    }
    checkUser();
}

function checkUser() {
    getserverData("http://localhost:3000/users").then(
    data => compareDatas(data)                  
    )          
}

function compareDatas(data) {
    inputValid();
    lista = [];
    lista.push(data);
    lista = lista[0];
    adat = getLoginInputData();
    var i;
    for (i = 0; i < lista.length; i++) {   
        if (lista[i].email == adat.email && lista[i].rendszam == adat.rendszam && lista[i].szerepelt==="true") {
            var sorszam = lista[i].id;
            lista[i].szerepelt = "true";
            bejelentkezes = lista[i];
            // bejelentkezes = adat;
            break;
        }else{
            bejelentkezes = adat;
            bejelentkezes.szerepelt = "false";
        }
    } 
    console.log(bejelentkezes);
    sessionStorage.setItem("cart", JSON.stringify(bejelentkezes));
    // window.sessionStorage.setItem("cart", JSON.stringify(bejelentkezes));
    tovabbWeboldalra();
}
// $_SESSION['test'] = json_encode($bejelentkezes);

function tovabbWeboldalra() {
    location.href = 'weboldal.html';
} 

function rendszamHelpBe() {
    rendszamInputHelp.style.visibility = "visible";
}

function rendszamHelpKi() {
    rendszamInputHelp.style.visibility = "hidden";
}

function inputValid(){
    let emailInput = document.getElementById("emailInput").value;
    emailInput = emailInput.toLowerCase();
    document.getElementById("emailInput").value = emailInput;
    let rendszamInput = document.getElementById("rendszamInput").value;
    rendszamInput = rendszamInput.replace(/[^a-zA-Z0-9]/g, '');
    rendszamInput = rendszamInput.toUpperCase();
    document.getElementById("rendszamInput").value = rendszamInput;  
}
// összeporszívózza az adatokat az inputokból
function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

// Set data.
function setLoginRow() {  
    let data = bejelentkezes; 
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

function setNewUser() {
    let data = bejelentkezes;
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
  
