window.addEventListener('load', init);

//Globals
let zeldaList = ['oot', 'mm', 'lttp', 'la', 'botw'];
let zeldaGallery;
let detailModal;
let detailModelContent;
let zeldaData = {};

let apiUrl = 'http://localhost/THE03.Magazine/webservice/index.php';

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
    createZeldaGallery();
}

//Establish connection with OpenSource Zelda API.
/** function getZelda() {
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(createZeldaGallery)
        .catch(ajaxErrorHandler);
}
 * Generate the playing field dynamically with all the available images
 */
function createZeldaGallery() {

    //Loop through all the images
    for (let i = 0; i < zeldaList.length; i++) {
        //Create div for card
        let div = document.createElement('div');
        div.classList.add('zelda-card');

        //Create & append H2 to div
        let h2 = document.createElement('h2');
        h2.innerHTML = i.toString();
        div.appendChild(h2);

        //Create image, hide it & append to div
        let img = document.createElement('img');
        img.src = `img/resources/${zeldaList[i]}.png`;
        img.dataset.id = i.toString();
        div.appendChild(img);

        //Create & append H2 to div
        let description = document.createElement('button');
        description.innerHTML = "Description";
        description.className = "view-description";
        div.appendChild(description);

        //Create & append H2 to div
        let favourite = document.createElement('button');
        favourite.innerHTML = "Add to Favourites";
        favourite.className = "add-to-favourite";
        div.appendChild(favourite);


        //Append div to playing field
        zeldaGallery.appendChild(div);
    }
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
/** function ajaxErrorHandler(data) {
    let error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = 'Something went wrong. Please come back later when we bred some more.';
    gallery.before(error);
}
**/