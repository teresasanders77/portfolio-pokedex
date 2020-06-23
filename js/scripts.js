//wrapped in IIFE to avoid acessing the global state
var pokemonRepository = (function () {
  var pokemonList = [
{
  name: 'Venusaur',
  height: 2,
  types: ['grass','poison'],
  },
{
  name: 'Volcarona',
  height: 1.6,
  types: ['fire','bug'],
  },
{
  name: 'Escavalier',
  height: 1,
  types: ['steel','bug'],
  }
];

//adds pokemon to pokemonList as long as it's an object
function add(pokemon) {
  if (typeof pokemon !== 'object') {
    return 'Not a valid input'
  }else{
    pokemonList.push(pokemon);
  }
}

function getAll(pokemon) {
  return pokemonList;
}

function addListItem(pokemon) {
var $listItem = document.createElement('li');
  $pokemonList.appendChild($listItem)
//adds button for each list item
var button = document.createElement('button');
  $listItem.appendChild(button);
//button inner text
button.innerText = pokemon.name;
button.classList.add('list-button');
$listItem.classList.add('button');
//logs details of each pokemon when clicked
button.addEventListener('click', function () {
  showDetails(pokemon)
  })
}

function showDetails(pokemon) {
  console.log(pokemon);
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  }
})();

//for each loop iterates over the pokemonList; prints details of each
var $pokemonList = document.querySelector('ul');
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
