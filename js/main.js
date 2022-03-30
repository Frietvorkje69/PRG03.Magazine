window.addEventListener('load', init);

//Globals
let zeldaList = ['oot', 'mm', 'lttp', 'la', 'botw'];
let zeldaGallery;
let descriptionText;

let apiUrl = 'http://localhost/THE03.Magazine/webservice/index.php';

/**
 * Initialize after the DOM is ready
 */
function init()
{
    //Retrieve the playing field element from the HTML
    zeldaGallery = document.getElementById('zelda-gallery');
    zeldaGallery.addEventListener('click', descriptionClickHandler);
    descriptionText = document.getElementById('alert');
    zeldaGallery.addEventListener('click', favouriteClickHandler);
    addToFavourite = document.getElementById('alert');

    createZeldaGallery();
}

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

        console.log('done')
    }
}

/**
 * Show the card by its front so the player knows whats going on
 *
 * @param e
 */

function descriptionClickHandler(e)
{
    let clickedDescItem = e.target;

    //Only continue if we clicked on the description
    if (clickedDescItem.className !== 'view-description') {
        return;
    }
    showDescription();
}

function favouriteClickHandler(e)
{
    let clickedFaveItem = e.target;

    //Only continue if we clicked on add to favourite
    if (clickedFaveItem.className !== 'add-to-favourite') {
        return;
    }
    addToFavourites();
}

/**
 * Write text for the user as feedback of their answer
 *
 * @param text
 */
function showDescription(text){
    console.log("hallo je hebt op een description item gedrukt")
    descriptionText.innerHTML = "yeah boi";
}

function addToFavourites(){
    console.log("hallo je hebt op een description item gedrukt")
    descriptionText.innerHTML = "yeah boi";
}

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