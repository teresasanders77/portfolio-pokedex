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
    item.weight = details.weight;
//loop for each type of pokemon
    item.types = [];
    for (var i = 0; i < details.types.length; i++) {
      item.types.push(details.types[i].type.name);
    }
//loop for the abilities of each pokemon 
    item.abilities = [];
    for (var i = 0; i < details.abilities.length; i++) {
      item.abilities.push(details.abilities[i].ability.name);
    }
  }).catch(function (error) {
    console.error(error);
  });
}

//function to show Modal
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

  var weightElement = document.createElement('p');
  weightElement.innerText = 'weight : ' + item.weight + 'kg';

  var typesElement = document.createElement('p');
  typesElement.innerText = 'types : ' + item.types;

  var abilitiesElement = document.createElement('p');
  abilitiesElement.innerText = 'abilities : ' + item.abilities;

  var imageElement = document.createElement('img');
  imageElement.classList.add('modal-img');
  imageElement.setAttribute('src', item.imageUrl);
//append modal content to page 
  modal.appendChild(closeButtonElement);
  modal.appendChild(nameElement);
  modal.appendChild(heightElement);
  modal.appendChild(weightElement);
  modal.appendChild(typesElement);
  modal.appendChild(abilitiesElement);
  modal.appendChild(imageElement);
  $modalContainer.appendChild(modal);
//add class to show modal
  $modalContainer.classList.add('is-visible');
}
//function to hide modal
function hideModal() {
  var modalContainer = document.querySelector('#modal-container');
  $modalContainer.classList.remove('is-visible');
}
//adds event listener when ESC is clicked
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
//adds event listener if clicking outside of modal
var $modalContainer = document.querySelector ('#modal-container');
$modalContainer.addEventListener('click', (e) => {
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