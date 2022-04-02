window.addEventListener('load', init);

//Globals
let apiUrl = 'http://localhost/THE03.Magazine/webservice';
let favourite;
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
let button;
let zeldaGallery;
let detailModal;
let detailModalContent;
let zeldaDatabase = {};

/**
 * Initialize after the DOM is ready
 */
function init() {
    //Create Gallery
    getZeldaData();

    //Retrieve the playing field element from the HTML
    zeldaGallery = document.getElementById('zelda-gallery');
    zeldaGallery.addEventListener('click', descClickHandler);
    zeldaGallery.addEventListener('click', faveClickHandler);
    //Retrieve Modal
    detailModal = document.getElementById('zelda-detail');
    detailModalContent = document.querySelector('.modal-content')

}

function getZeldaData() {
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
        zeldaGallery.appendChild(zeldaCard);

        //Element for the name of the Zelda Game
        let title = document.createElement('h2');
        title.innerHTML = zeldaData.name;
        zeldaCard.appendChild(title);

        //Element for the image of the Zelda Game
        let image = document.createElement('img');
        image.src = zeldaData.image;
        image.dataset.id = zeldaData.id;
        zeldaCard.appendChild(image);

        //Description button for the Zelda Game
        let description = document.createElement('button');
        description.innerHTML = "Description";
        description.className = "view-description";
        description.dataset.id = zeldaData.id;
        zeldaCard.appendChild(description)

        //Favourite button for the Zelda Game
        favourite = document.createElement('button');
        favourite.innerHTML = "Add to favourites";
        favourite.classList.add('favourite-btn')
        for (let id of favourites) {
            console.log(`${id}, ${zeldaData.id}`)
            //werkt alleen met  ==, niet met === WAAROM???
            if (id == zeldaData.id) {
                console.log('yeeees')
                zeldaCard.classList.add("fave");
                favourite.classList.add("favourite");
                favourite.innerHTML = "Favourited";
            } else {
            }
        }
            favourite.dataset.id = zeldaData.id;
            zeldaCard.appendChild(favourite)

            zeldaDatabase[zeldaData.id] = zeldaData
        }
    }


    /**
     * Show the card by its front so the player knows whats going on
     *
     * @param e
     */
    function faveClickHandler(e) {
        let target = e.target;

        if (target.nodeName === 'BUTTON') {
            if (target.classList.contains("favourite")) {
                console.log('favourite removed')
                removeFave(target);
            } else if (target.className === "favourite-btn") {
                console.log('favourite added')
                addFave(target)
            }
        }
    }

    function descClickHandler(e) {
        let target = e.target;
        if (target.className !== 'view-description') {
            return;
        }
        showModal(target)
    }

    function showModal(target) {
        detailModal.addEventListener('click', modalClickHandler)
        console.log(target);
        detailModal.classList.add('open');
        let zeldaData = zeldaDatabase[target.dataset.id];

        detailModalContent.innerHTML = "";
        //Element for the name of the Pokémon
        let title = document.createElement('h1');
        title.innerHTML = zeldaData.name;
        detailModalContent.appendChild(title);

        //Element for the image of the Pokémon
        let image = document.createElement('img');
        if (zeldaData.id === 7) {
            image.src = zeldaData.image2;
            detailModalContent.appendChild(image);
        } else {
            image.src = zeldaData.image;
            detailModalContent.appendChild(image);
        }

        let title2 = document.createElement('h4')
        title2.innerHTML = `Console(s): ${zeldaData.console.join(", ")}.`
        detailModalContent.appendChild(title2)

        let description = document.createElement('h3')
        description.innerHTML = `" ${zeldaData.quote} "`;
        detailModalContent.appendChild(description)
    }

    function addFave(target) {
        target.classList.add("favourite");
        target.parentElement.classList.add("favourite");
        target.innerHTML = "Favourited";

        favourites.push(target.dataset.id);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    function removeFave(target) {
        target.classList.remove("favourite");
        target.parentElement.classList.remove("favourite");
        target.innerHTML = "Add to favourites";

        let index = favourites.indexOf(target.dataset.id);
        favourites.splice(index, 1);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    function modalClickHandler(e) {
        let target = e.target;
        if (target.id === 'modal-close') {
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
        error.innerHTML = "I AM<br>ERROR.";
        zeldaGallery.before(error);
    }