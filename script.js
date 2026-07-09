// =====================================
// Lexin V2O
// Graffiti Edition
// =====================================

const PASSWORD = "ezra091008*";


// ======================
// Elements
// ======================

const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");

const searchInput = document.getElementById("searchInput");
const linkContainer = document.getElementById("linkContainer");

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

const deletePopup = document.getElementById("deletePopup");
const deleteConfirm = document.getElementById("deleteConfirm");
const deleteCancel = document.getElementById("deleteCancel");

const changeWallpaper = document.getElementById("changeWallpaper");
const wallpaperInput = document.getElementById("wallpaperInput");

const backgroundColour = document.getElementById("backgroundColour");
const backgroundGradient = document.getElementById("backgroundGradient");

const exportLinks = document.getElementById("exportLinks");
const importLinks = document.getElementById("importLinks");


// ======================
// Data
// ======================

let links =
JSON.parse(localStorage.getItem("lexin_links")) || [];

let editingIndex = -1;
let deletingIndex = -1;


// ======================
// Login
// ======================

function login(){

    if(passwordInput.value === PASSWORD){

        errorMessage.textContent = "";

        loginScreen.classList.add("hidden");

        homeScreen.classList.remove("hidden");

        createFooter();

        renderLinks();

    }
    else{

        errorMessage.textContent =
        "Contact hndzraa on TikTok for access.";

    }

}


loginBtn.addEventListener("click", login);


passwordInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        login();

    }

});


// ======================
// Footer
// ======================

function createFooter(){

    if(document.querySelector(".appFooter")) return;

    const footer=document.createElement("div");

    footer.className="appFooter";

    footer.textContent=
    "© 2026 Lexin V2O • Designed by hndzraa";

    document.body.appendChild(footer);

}


// ======================
// Add Website
// ======================

addButton.addEventListener("click",()=>{

    popupTitle.textContent="Add Website";

    siteName.value="";
    siteURL.value="";

    editingIndex=-1;

    popup.classList.remove("hidden");

});


cancelButton.addEventListener("click",()=>{

    popup.classList.add("hidden");

});


// ======================
// Save Website
// ======================

saveButton.addEventListener("click",()=>{

    let name = siteName.value.trim();
    let url = siteURL.value.trim();


    if(!name || !url){

        alert("Please fill in every field.");
        return;

    }


    if(!url.startsWith("http")){

        url="https://"+url;

    }


    const website={
        name:name,
        url:url
    };


    if(editingIndex === -1){

        links.push(website);

    }
    else{

        links[editingIndex]=website;

    }


    localStorage.setItem(
        "lexin_links",
        JSON.stringify(links)
    );


    popup.classList.add("hidden");

    renderLinks();

});


// ======================
// Render
// ======================

function renderLinks(){

    linkContainer.innerHTML="";

    let keyword =
    searchInput.value.toLowerCase();


    links.forEach((link,index)=>{


        if(!link.name.toLowerCase().includes(keyword))
        return;


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


        <button onclick="askDelete(${index})">
        Delete
        </button>


        </div>

        `;


        linkContainer.appendChild(card);


    });

}


searchInput.addEventListener(
"input",
renderLinks
);


// ======================
// Edit
// ======================

window.editLink=function(index){

    editingIndex=index;

    popupTitle.textContent="Edit Website";

    siteName.value=links[index].name;

    siteURL.value=links[index].url;

    popup.classList.remove("hidden");

};


// ======================
// Delete
// ======================

window.askDelete=function(index){

    deletingIndex=index;

    deletePopup.classList.remove("hidden");

};


deleteCancel.addEventListener("click",()=>{

    deletePopup.classList.add("hidden");

});


deleteConfirm.addEventListener("click",()=>{

    links.splice(deletingIndex,1);


    localStorage.setItem(
        "lexin_links",
        JSON.stringify(links)
    );


    deletePopup.classList.add("hidden");

    renderLinks();

});


// ======================
// Settings
// ======================

settingsButton.addEventListener("click",()=>{

    settingsPopup.classList.remove("hidden");

});


closeSettings.addEventListener("click",()=>{

    settingsPopup.classList.add("hidden");

});


// Wallpaper

changeWallpaper.addEventListener("click",()=>{

    wallpaperInput.click();

});


wallpaperInput.addEventListener("change",function(){

    const file=this.files[0];

    if(!file)return;


    const reader=new FileReader();


    reader.onload=function(e){

        document.body.style.backgroundImage =
        `url(${e.target.result})`;

        document.body.style.backgroundSize="cover";


        localStorage.setItem(
        "lexin_wallpaper",
        e.target.result
        );

    };


    reader.readAsDataURL(file);

});


// Colour

backgroundColour.addEventListener("click",()=>{

    let colour=prompt(
    "Enter colour or HEX:"
    );


    if(colour){

        document.body.style.background=colour;

        localStorage.setItem(
        "lexin_colour",
        colour
        );

    }

});


// Gradient

backgroundGradient.addEventListener("click",()=>{

    document.body.style.background=
    "linear-gradient(135deg,#111827,#000000)";

});


// Export

exportLinks.addEventListener("click",()=>{

    const blob=new Blob(
    [JSON.stringify(links,null,2)],
    {type:"application/json"}
    );


    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="Lexin_Backup.json";

    a.click();

});


// Import

importLinks.addEventListener("click",()=>{

    const input=document.createElement("input");

    input.type="file";

    input.accept=".json";


    input.onchange=function(){

        const reader=new FileReader();


        reader.onload=function(){

            links=JSON.parse(reader.result);


            localStorage.setItem(
            "lexin_links",
            JSON.stringify(links)
            );


            renderLinks();

        };


        reader.readAsText(this.files[0]);

    };


    input.click();

});


// ======================
// Load Saved Settings
// ======================

window.addEventListener("load",()=>{


    const wallpaper =
    localStorage.getItem("lexin_wallpaper");


    const colour =
    localStorage.getItem("lexin_colour");


    if(wallpaper){

        document.body.style.backgroundImage =
        `url(${wallpaper})`;

        document.body.style.backgroundSize="cover";

    }


    if(colour){

        document.body.style.background=colour;

    }


});


// Initial render

renderLinks();
