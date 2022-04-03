window.addEventListener("load", init);

//Global VARS
let apiUrl = "http://localhost/THE03.Magazine/webservice";
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
let titleModal;
let button;
let zeldaGallery;
let detailModal;
let detailModalContent;
let zeldaDatabase = {};

//Starts the entire webpage
function init() {
    //Create Gallery
    getZeldaData();

    //Retrieve the gallery element from the HTML
    zeldaGallery = document.getElementById("zelda-gallery");
    zeldaGallery.addEventListener("click", descClickHandler);
    zeldaGallery.addEventListener("click", faveClickHandler);

    //Retrieve the modal element from the HTML
    detailModal = document.getElementById("zelda-detail");
    detailModalContent = document.querySelector(".modal-content")
}

//Request data from API, then create gallery
function getZeldaData() {
    ajaxRequest(apiUrl, createZeldaGallery)
}

//Handles all requests needed for the API
function ajaxRequest(url, successHandler) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(successHandler)
        .catch(ajaxErrorHandler);
}

//Add the gallery to the HTML
function createZeldaGallery(data) {
    //Loop through all the images
    for (let zeldaData of data) {
        //Create div for card
        let zeldaCard = document.createElement("div");
        zeldaCard.classList.add("zelda-card");
        zeldaCard.dataset.name = zeldaData.name
        zeldaGallery.appendChild(zeldaCard);

        //Element for the name of the Zelda Game
        let title = document.createElement("h2");
        title.innerHTML = zeldaData.name;
        zeldaCard.appendChild(title);

        //Element for the image of the Zelda Game
        let image = document.createElement("img");
        image.src = zeldaData.image;
        image.dataset.id = zeldaData.id;
        zeldaCard.appendChild(image);

        //Description button for the Zelda Game
        let description = document.createElement("BUTTON");
        description.innerHTML = "Description";
        description.className = "view-description";
        description.dataset.id = zeldaData.id;
        zeldaCard.appendChild(description)

        //Favourite button for the Zelda Game
        faveButton = document.createElement("BUTTON");
        faveButton.innerHTML = "Add to favourites";
        faveButton.classList.add("favourite-btn")
        //Check if listed game is already added to favourites in local storage
        for (let id of favourites) {
            //The following IF-statement only works with double == because of differing types of content
            if (id == zeldaData.id) {
                zeldaCard.classList.add("favouriteCard");
                faveButton.classList.add("favourite");
                faveButton.innerHTML = "Favourited";
            } else {
            }
        }
        faveButton.dataset.id = zeldaData.id;
        zeldaCard.appendChild(faveButton)

        zeldaDatabase[zeldaData.id] = zeldaData
    }
}

//Listens to click events on "fave" button
function faveClickHandler(e) {
    let target = e.target;

    if (target.nodeName === "BUTTON") {
        if (target.classList.contains("favourite")) {
            removeFave(target);
        } else if (target.className === "favourite-btn") {
            addFave(target)
        }
    }
}

//Listens to click events on "desc" button
function descClickHandler(e) {
    let target = e.target;
    if (target.className !== "view-description") {
        return;
    }
    showModal(target)
}

//Listens to click events on modal close button
function modalClickHandler(e) {
    let target = e.target;
    if (target.id === "modal-close") {
        detailModal.removeEventListener("click", modalClickHandler);
        detailModal.classList.remove("open");
    }
}

//Open the modal for the selected item
function showModal(target) {
    detailModal.addEventListener("click", modalClickHandler)
    console.log(target);
    detailModal.classList.add("open");
    let zeldaData = zeldaDatabase[target.dataset.id];

    detailModalContent.innerHTML = "";
    //Element for the name of the game (modal)
    let title= document.createElement("h1");
    title.innerHTML = zeldaData.name;
    //Select random colour for modal title
    let RNG = Math.floor(Math.random() * 10);
    switch (true) {
        case (RNG > 8):
            title.classList.add("red");
            break;
        case (RNG > 6):
            title.classList.add("blue");
            break;
        case (RNG > 4):
            title.classList.add("green");
            break;
        case (RNG > 2):
            title.classList.add("purple");
            break;
        default:
            title.classList.add("yellow");
            break;
    }
    detailModalContent.appendChild(title);

    //Element for the image of the game (modal)
    let image = document.createElement("img");
    //Small easter egg if selected game is Zelda II
    if (zeldaData.name === "The Legend of Zelda II") {
        image.src = zeldaData.image2;
        detailModalContent.appendChild(image);
    } else {
        image.src = zeldaData.image;
        detailModalContent.appendChild(image);
    }

    //Element for the console(s) of the game (modal)
    let title2 = document.createElement("h3")
    title2.innerHTML = `Console(s): ${zeldaData.console.join(", ")}.`
    detailModalContent.appendChild(title2)

    //Element for the quote of the game (modal)
    let quote = document.createElement("h3")
    quote.innerHTML = `"${zeldaData.quote}"`;
    detailModalContent.appendChild(quote)
}

//Add item to local storage
function addFave(target) {
    target.classList.add("favourite");
    target.parentElement.classList.add("favouriteCard");
    target.innerHTML = "Favourited";

    favourites.push(target.dataset.id);
    localStorage.setItem("favourites", JSON.stringify(favourites));
}

//Remove item from local storage
function removeFave(target) {
    target.classList.remove("favourite");
    target.parentElement.classList.remove("favouriteCard");
    target.innerHTML = "Add to favourites";

    let index = favourites.indexOf(target.dataset.id);
    favourites.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(favourites));
}

//Handles all the errors with the API
function ajaxErrorHandler(data) {
    let error = document.createElement("div");
    console.log(data)
    error.classList.add("error");
    error.innerHTML = "I AM<br>ERROR.";
    zeldaGallery.before(error);
}