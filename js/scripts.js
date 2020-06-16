var pokemonList = [
{
		name: 'Venusaur',
		height: 2,
		types: ['grass','poison'],
	},
{
		name: 'Zapdos',
		height: 2,
		types: ['electric','flying'],
	},
{
		name: 'Escavalier',
		height: 1,
		types: ['steel','bug'],
	},
];
for ( let i = 0; i < pokemonList.length; i++) {
  document.write('<h2>' + pokemonList[i].name + '</h2>' + ' Height: ' + pokemonList[i].height)
}
