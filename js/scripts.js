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

return {
  add: add,
  getAll: getAll,
}
})();

var $pokemonList = document.querySelector('ul');
pokemonRepository.getAll().forEach(function(pokemon){
  var $listItem = document.createElement('li');
  $pokemonList.appendChild($listItem)
  var button = document.createElement('button');
  $listItem.appendChild(button);
  button.innerText = pokemon.name;
  button.classList.add('list-button');
  $listItem.classList.add('button');

});
