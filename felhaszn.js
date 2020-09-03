//Keys of users.
let keys = ["id", "rendszam", "email","biztosito","baleset_datum","tulaj_neve","auto_tipus","szerepelt"];

// Get data from the server.
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

function stratGetusers() {
    getserverData("http://localhost:3000/users").then(
        data => fillDataTable(data, "userTable")
    );    
}
document.querySelector("#getDataBtn").addEventListener("click", stratGetusers);

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

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function createBtnGroup() {
    let group = createAnyElement("div", {class: "btn btn-group"});
    let btnInfo = createAnyElement("button", {class: "btn btn-info", onclick: "setRow(this)"});
    btnInfo.innerHTML = '<i class="fas fa-sync" aria-hidden="true"></i>';
    let delBtn = createAnyElement("button", {class: "btn btn-danger",  onclick: "delRow(this)"});
    delBtn.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>';
    
    group.appendChild(btnInfo);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}

function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRowData(tr);
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };
    fetch('http://localhost:3000/users/'+data.id, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err),
    ).then(
        data => {
            stratGetusers();
        }
    );
}

// Create new user.
function newUserRow(row) {
    let tr = createAnyElement("tr");
    for (let k of keys) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
        });
        td.appendChild(input);
        tr.appendChild(td);
    }
    let newBtn = createAnyElement("button", {
        class: "btn btn-success",
        onclick: "createUser(this)"
    });
    newBtn.innerHTML = '<i class="fas fa-plus-circle" aria-hidden="true"></i>';
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
}

function createUser(btn) {
    let tr = btn.parentElement.parentElement;  
    let data = getRowData(tr);
    delete data.id;
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
function setRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRowData(tr);
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
            data => stratGetusers()
    );
}
    
        
 