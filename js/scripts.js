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
	},
];

function myLoopFunction(pokemon) {
	document.write('<p>' + pokemon.name + ' \(height: ' + pokemon.height + '\)')
	if (pokemon.height >= 2) {
		document.write('- Wow, that\'s big!' + '<p>' )
	}
}
pokemonList.forEach(myLoopFunction);

