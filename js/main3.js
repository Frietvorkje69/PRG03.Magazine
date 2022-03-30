window.addEventListener('load', init);

//Globals
let apiUrl = 'http://localhost/THE03.Magazine/webservice';
let zeldaGallery;
let detailModal;
let detailModalContent;
let zeldaDatas = {};

/**
 * Initialize after the DOM is ready
 */
function init()
{
    //Retrieve the playing field element from the HTML
    zeldaGallery = document.getElementById('zelda-gallery');
    zeldaGallery.addEventListener('click', galleryClickHandler);
    //Retrieve Modal
    detailModal = document.getElementById('zelda-detail');
    detailModalContent = document.querySelector('.modal-content')
    //Create Gallery
    getZeldaData();
}

function getZeldaData()
{
    ajaxRequest(apiUrl, createZeldaGallery)
}

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

function createZeldaGallery(data) {

    //Loop through all the images
    for (let zeldaData of data) {
        //Create div for card
        let zeldaCard = document.createElement('div');
        zeldaCard.classList.add('zelda-card');
        zeldaCard.dataset.name = zeldaData.name

        //Append Pokémon card to the actual HTML
        zeldaGallery.appendChild(zeldaCard);

        //Retrieve the detail information from the API
        ajaxRequest(`${apiUrl}?id=${zeldaData.id}`, fillZeldaCard)
    }
}

function fillZeldaCard(zeldaData)
{
    //Wrapper element for every Zelda card
    let zeldaCard = document.querySelector(`.zelda-card[data-name='${zeldaData.name}']`);

    //Element for the name of the Zelda Game
    let title = document.createElement('h2');
    title.innerHTML = zeldaData.name;
    zeldaCard.appendChild(title);

    //Element for the image of the Zelda Game
    let image = document.createElement('img');
    image.src = zeldaData.image;
    zeldaCard.appendChild(image);

    //Description button for the Zelda Game
    let description = document.createElement('button');
    description.innerHTML = "Description";
    description.className = "view-description";
    description.dataset.id = zeldaData.id;
    zeldaCard.appendChild(description)

    //Favourite button for the Zelda Game
    let favourite = document.createElement('button');
    favourite.innerHTML = "Add to favourites";
    favourite.className = "add-favourite";
    favourite.dataset.id = zeldaData.id;
    zeldaCard.appendChild(favourite)


    zeldaDatas[zeldaData.id] = zeldaData
}


/**
 * Show the card by its front so the player knows whats going on
 *
 * @param e
 */

function galleryClickHandler(e) {
    let clickedItem = e.target;
    if(clickedItem.className !== 'view-description') {
        return;
    }
    showModal(clickedItem)
}

function showModal(target) {
    detailModal.addEventListener('click', modalClickHandler)
    console.log(target);
    detailModal.classList.add('open');
    //let pokemon = pokemonData[target.dataset.id];

    detailModalContent.innerHTML = "";
    //Element for the name of the Pokémon
    let title = document.createElement('h2');
    title.innerHTML = `text`;
    detailModalContent.appendChild(title);

    //Element for the image of the Pokémon
    //let image = document.createElement('img');
    //image.src = pokemon.sprites.front_shiny;
    //detailModalContent.appendChild(image);
}

function modalClickHandler (e) {
    let target = e.target;
    if (target.className === 'view-description' && target.id === 'modal-close') {
        detailModal.removeEventListener('click', modalClickHandler);
        detailModal.classList.remove('open');
    }
}

/**
 * Write text for the user as feedback of their answer
 *
 * @param text
 */

/**
 * Do something useful with the error you got back from the external API
 *
 * @param data
 */

function ajaxErrorHandler(data) {
    let error = document.createElement('div');
    console.log(data)
    error.classList.add('error');
    error.innerHTML = 'Something went wrong with the API. Please come back later.';
    zeldaGallery.before(error);
}