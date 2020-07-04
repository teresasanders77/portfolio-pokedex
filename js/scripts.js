//wrapped in IIFE to avoid acessing the global state
var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//adds pokemon to pokemonList as long as it's an object
function add(pokemon) {
  if (typeof pokemon !== 'object') {
    return 'Not a valid input'
  }else{
    pokemonList.push(pokemon);
  }
}

//function to pull all data
function getAll() {
  return pokemonList;
}

//function to create a list
function addListItem(pokemon) {
  var $pokemonList = document.querySelector('ul');
  var $listItem = document.createElement('li');
    $pokemonList.appendChild($listItem);
//adds button for each list item
  var $button = document.createElement('button');
    $listItem.appendChild($button);
//button inner text
  $button.innerText = pokemon.name;
  $button.classList.add('list-button');
  $listItem.classList.add('button');
//logs details of each pokemon when clicked
$button.addEventListener('click', function(event) {
  showDetails(pokemon);
  })
}

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function() {
    console.log(item);
    showModal(item);
  });
}

//function to load list from api
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
    //if promse is resolved, the following is run
  }).then(function (json) {
    json.results.forEach(function (item) {
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
    //if promise is rejected, the following is run
  }).catch(function (error) {
    console.error(error);
  })
}

//function to load details
function loadDetails(item) {
  var url = item.detailsUrl;
  return fetch(url).then(function(response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = Object.keys(details.types);
  }).catch(function (error) {
    console.error(error);
  });
}

//function to console.log details
function showModal(item) {
  var $modalContainer = document.querySelector('#modal-container');
 
  // Clear all existing modal content 
  $modalContainer.innerHTML = '';

  var modal = document.createElement('div');
  modal.classList.add('modal');
  
  //Add the new modal content
  var closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  var nameElement = document.createElement('h1');
  nameElement.innerText = item.name;

  var heightElement = document.createElement('p');
  heightElement.innerText = 'height : ' + item.height + 'm';

  var imageElement = document.createElement('img');
  imageElement.classList.add('modal-img');
  imageElement.setAttribute('src', item.imageUrl);

  modal.appendChild(closeButtonElement);
  modal.appendChild(nameElement);
  modal.appendChild(heightElement);
  modal.appendChild(imageElement);
  $modalContainer.appendChild(modal);
  
  $modalContainer.classList.add('is-visible');
}

function hideModal() {
  var modalContainer = document.querySelector('#modal-container');
  $modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

var $modalContainer = document.querySelector ('#modal-container');
$modalContainer.addEventListener('click', (e) => {
    //Closes if the user clicks directly on the overlay
  var target = e.target;
  if (target === $modalContainer) {
    hideModal();
    }
  });

//returns values that can be accessed to outside the IIFE
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal,
  hideModal: hideModal
  };  
})();

//forEach function to list pokemon by name on buttons 
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});