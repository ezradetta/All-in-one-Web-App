// =====================================
// Lexin V2O
// Graffiti Edition
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

const deletePopup = document.getElementById("deletePopup");
const deleteConfirm = document.getElementById("deleteConfirm");
const deleteCancel = document.getElementById("deleteCancel");



// ----------------------
// Data
// ----------------------

let links =
JSON.parse(localStorage.getItem("lexin_links")) || [];


let editingIndex = -1;

let deletingIndex = -1;




// ----------------------
// Login
// ----------------------

function login(){

    if(passwordInput.value === PASSWORD){


        errorMessage.textContent="";


        loginScreen.classList.add("hidden");


        setTimeout(()=>{

            homeScreen.classList.remove("hidden");

        },300);



        createFooter();

        renderLinks();



    }else{


        errorMessage.textContent =
        "Contact hndzraa on TikTok for access.";


    }

}



loginBtn.addEventListener("click",login);



passwordInput.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        login();

    }

});




// ----------------------
// Footer
// ----------------------

function createFooter(){


    if(document.querySelector(".appFooter")) return;


    const footer=document.createElement("div");


    footer.className="appFooter";


    footer.textContent=
    "© 2026 Lexin V2O • Designed by hndzraa";


    document.body.appendChild(footer);


}




// ----------------------
// Add Popup
// ----------------------

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





// ----------------------
// Save
// ----------------------

saveButton.addEventListener("click",()=>{


    let name=siteName.value.trim();

    let url=siteURL.value.trim();



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




// ----------------------
// Render Websites
// ----------------------

function renderLinks(){


const container=
document.getElementById("linkContainer");


container.innerHTML="";


let keyword=
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



container.appendChild(card);



});


}



searchInput.addEventListener(
"input",
renderLinks
);





// ----------------------
// Edit
// ----------------------

window.editLink=function(index){


editingIndex=index;


popupTitle.textContent=
"Edit Website";


siteName.value=
links[index].name;


siteURL.value=
links[index].url;


popup.classList.remove("hidden");


};





// ----------------------
// Delete System
// ----------------------

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





// ----------------------
// Settings
// ----------------------

settingsButton.addEventListener("click",()=>{

settingsPopup.classList.remove("hidden");

});



closeSettings.addEventListener("click",()=>{

settingsPopup.classList.add("hidden");

});




// ----------------------
// Start
// ----------------------

renderLinks();
