// =====================================
// Lexin V2O
// Version 2.0
// =====================================

const PASSWORD = "ezra091008*";

// ----------------------
// Elements
// ----------------------

const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");

const searchInput = document.getElementById("searchInput");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");

const siteName = document.getElementById("siteName");
const siteURL = document.getElementById("siteURL");

const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

const addButton = document.getElementById("addButton");

const settingsButton = document.getElementById("settingsButton");
const settingsPopup = document.getElementById("settingsPopup");
const closeSettings = document.getElementById("closeSettings");

// ----------------------
// App Data
// ----------------------

let links = JSON.parse(localStorage.getItem("lexin_links")) || [];

let editingIndex = -1;

// ----------------------
// Login
// ----------------------

function login() {

    if (passwordInput.value === PASSWORD) {

        errorMessage.textContent = "";

        loginScreen.classList.add("hidden");

        homeScreen.classList.remove("hidden");

        renderLinks();

    } else {

        errorMessage.textContent =
        "Contact hndzraa on TikTok for the code.";

    }

}

loginBtn.addEventListener("click", login);

passwordInput.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        login();

    }

});

// ----------------------
// Popup
// ----------------------

addButton.addEventListener("click", function(){

    popupTitle.textContent="Add Website";

    siteName.value="";

    siteURL.value="";

    editingIndex=-1;

    popup.classList.remove("hidden");

});

cancelButton.addEventListener("click",function(){

    popup.classList.add("hidden");

});

// ----------------------
// Save Link
// ----------------------

saveButton.addEventListener("click",function(){

    let name=siteName.value.trim();

    let url=siteURL.value.trim();

    if(name===""||url===""){

        alert("Please fill in every field.");

        return;

    }

    if(!url.startsWith("http")){

        url="https://"+url;

    }

    if(editingIndex===-1){

        links.push({

            name:name,

            url:url

        });

    }else{

        links[editingIndex]={

            name:name,

            url:url

        };

    }

    localStorage.setItem("lexin_links",JSON.stringify(links));

    popup.classList.add("hidden");

    renderLinks();

});

// ----------------------
// Render
// ----------------------

function renderLinks(){

    const container=document.getElementById("linkContainer");

    container.innerHTML="";

    let keyword=searchInput.value.toLowerCase();

    links.forEach(function(link,index){

        if(!link.name.toLowerCase().includes(keyword)) return;

        const card=document.createElement("div");

        card.className="websiteCard";

        card.innerHTML=`

        <h3>${link.name}</h3>

        <p>${link.url}</p>

        <div class="cardButtons">

            <button onclick="window.open('${link.url}','_blank')">

            Open

            </button>

            <button onclick="editLink(${index})">

            Edit

            </button>

            <button onclick="deleteLink(${index})">

            Delete

            </button>

        </div>

        `;

        container.appendChild(card);

    });

}

searchInput.addEventListener("input",renderLinks);

// ----------------------
// Edit
// ----------------------

window.editLink=function(index){

    editingIndex=index;

    popupTitle.textContent="Edit Website";

    siteName.value=links[index].name;

    siteURL.value=links[index].url;

    popup.classList.remove("hidden");

}

// ----------------------
// Delete
// ----------------------

window.deleteLink=function(index){

    if(confirm("Delete this website?")){

        links.splice(index,1);

        localStorage.setItem("lexin_links",JSON.stringify(links));

        renderLinks();

    }

}

// ----------------------
// Settings
// ----------------------

settingsButton.addEventListener("click",function(){

    settingsPopup.classList.remove("hidden");

});

closeSettings.addEventListener("click",function(){

    settingsPopup.classList.add("hidden");

});

// ----------------------
// Initial
// ----------------------

renderLinks();
